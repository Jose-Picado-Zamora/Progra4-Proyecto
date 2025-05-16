import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BIN = '681cf12f8a456b796699e7ce';
const PROJECTS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN;
const API_KEY = '$2a$10$3dXKCW5tKrG09Iwfsx0Xi.GU6IPerttg6BUT8UdlJ0VhuQbkH.Rny';

const fetchProjects = async () => {
  try {
    const response = await axios.get(PROJECTS_API_URL, {
      headers: {
        'X-Access-Key': API_KEY,
      }
    });
    return response.data.record.projects;  // se retorna la informacion de la api de project
  }
  catch (error) {
    console.error('Error fetching projects:', error);

    return [];

  }
};

type Project = {

  id: number;
  name: string;
  email: string;
  ubicacion: string;
  solicitudProyecto: string;
}



export async function postProjects(newProject: Project) {

  const projects = await fetchProjects();

  projects.push(newProject);

  try {
    const response = await axios.put(
      PROJECTS_API_URL,
      { projects: projects },
      {
        headers: {
          'X-Access-Key': API_KEY,
        }
      }
    );

    if (response.status != 200)
      throw new Error("Error adding projects");

    return newProject;
  } catch (error) {
    console.error("Error adding projects:", error);
  }

}

export function useAddProject() {
  const queryClient = useQueryClient()

  
  return useMutation({
    mutationFn: postProjects,
    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] })
      const previous = queryClient.getQueryData(['projects'])

      queryClient.setQueryData<Project[]>(['projects'], (old) => {
        return [...(old || []), newProject];
      });

      return { previous }
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['projects'], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:['projects']})
    }
  })
}

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};