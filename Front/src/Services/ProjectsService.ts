import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext';


const useAuthorizedClient = () => {
  const { token } = useAuth();

  const authorizedClient = axios.create({
    baseURL: 'https://localhost:7210',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return authorizedClient;
};

export type Project = {

  id: number;
  name: string;
  email: string;
  location: string;
  application: string;
}

export const useProjectService = () => {
  const client = useAuthorizedClient();

  const fetchProjects = async (): Promise<Project[]> => {
    try {
      const response = await client.get('/api/projects');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return [];
    }
  };

  const postProjects = async (newProject: Project) => {
    try {
      //console.log("🚀 Proyecto a enviar:", JSON.stringify(newProject, null, 2));
      const response = await client.post('/api/projects', newProject);

      if (response.status !== 200 && response.status !== 201)
        throw new Error("Error adding project");

      return response.data;
    } catch (error) {
      console.error("Error adding projects:", error);
      throw error;
    }
  };

   const updateProject = async (updateProject: Project) => {
      try {
        const response = await client.put(`/api/projects/${updateProject.id}`, updateProject);
        if (response.status !== 200) throw new Error("Error updating project");
        return response.data;
      } catch (error) {
        console.error("Error updating projects:", error);
        throw error;
      }
    };

  return { fetchProjects, postProjects, updateProject };
};


export const useProjects = () => {
  const { fetchProjects } = useProjectService();

  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export function useAddProject() {
  const queryClient = useQueryClient();
  const { postProjects } = useProjectService();

  return useMutation({
    mutationFn: postProjects,
    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previous = queryClient.getQueryData(['projects']);

      queryClient.setQueryData<Project[]>(['projects'], (old) => {
        return [...(old || []), newProject];
      });

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['projects'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { updateProject } = useProjectService();

  return useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
}
