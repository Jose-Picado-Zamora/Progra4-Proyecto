// Services/VolunteersService.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export type Volunteer = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  rol: string;
  projectName: string;
};

export const useVolunteerService = () => {
  const client = useAuthorizedClient();

  const fetchVolunteers = async (): Promise<Volunteer[]> => {
    try {
      const response = await client.get('/api/volunteers');
      return response.data;
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      return [];
    }
  };

  const postVolunteer = async (newVolunteer: Volunteer) => {
    try {
      const response = await client.post('/api/volunteers', newVolunteer);

      if (response.status !== 200 && response.status !== 201)
        throw new Error("Error adding volunteer");

      return response.data;
    } catch (error) {
      console.error("Error adding volunteer:", error);
      throw error;
    }
  };

  const updateVolunteer = async (updatedVolunteer: Volunteer) => {
    try {
      const response = await client.put(`/api/volunteers/${updatedVolunteer.id}`, updatedVolunteer);
      if (response.status !== 200) throw new Error("Error updating volunteer");
      return response.data;
    } catch (error) {
      console.error("Error updating volunteer:", error);
      throw error;
    }
  };

  const deleteVolunteer = async (volunteerId: number) => {
    try {
      const response = await client.delete(`/api/volunteers/${volunteerId}`);
      if (response.status !== 200) throw new Error("Error deleting volunteer");
      return response.data;
    } catch (error) {
      console.error("Error deleting volunteer:", error);
      throw error;
    }
  };

  return { fetchVolunteers, postVolunteer, updateVolunteer, deleteVolunteer };
};

export const useVolunteers = () => {
  const { fetchVolunteers } = useVolunteerService();

  return useQuery<Volunteer[], Error>({
    queryKey: ['volunteers'],
    queryFn: fetchVolunteers,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export function useAddVolunteers() {
  const queryClient = useQueryClient();
  const { postVolunteer } = useVolunteerService();

  return useMutation<
    Volunteer,
    Error,     
    Volunteer, 
    { previous: Volunteer[] | undefined } 
  >({
    mutationFn: postVolunteer,
    onMutate: async (newVolunteer) => {
      await queryClient.cancelQueries({ queryKey: ['volunteers'] });
      const previous = queryClient.getQueryData<Volunteer[]>(['volunteers']); 

      queryClient.setQueryData<Volunteer[]>(['volunteers'], (old) => {
        return [...(old || []), newVolunteer];
      });

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData<Volunteer[]>(['volunteers'], context.previous); // Specify type for setQueryData
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });
}

export function useUpdateVolunteer() {
  const queryClient = useQueryClient();
  const { updateVolunteer } = useVolunteerService();

  return useMutation<Volunteer, Error, Volunteer>({
    mutationFn: updateVolunteer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });
}

export function useDeleteVolunteer() {
  const queryClient = useQueryClient();
  const { deleteVolunteer } = useVolunteerService();

  return useMutation<void, Error, number>({
    mutationFn: deleteVolunteer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['volunteers'] });
    },
  });
}