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

export type Donor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  donationType: string;
  details: string;
};

export const useDonorService = () => {
  const client = useAuthorizedClient();

  const fetchDonors = async (): Promise<Donor[]> => {
    try {
      const response = await client.get('/api/donors');
      return response.data;
    } catch (error) {
      console.error('Error fetching donors:', error);
      return [];
    }
  };

  const postDonor = async (newDonor: Donor) => {
    try {
      const response = await client.post('/api/donors', newDonor);

      if (response.status !== 200 && response.status !== 201)
        throw new Error("Error adding donor");

      return response.data;
    } catch (error) {
      console.error("Error adding donor:", error);
      throw error;
    }
  };

  const updateDonor = async (updatedDonor: Donor) => {
    try {
      const response = await client.put(`/api/donors/${updatedDonor.id}`, updatedDonor);
      if (response.status !== 200) throw new Error("Error updating donor");
      return response.data;
    } catch (error) {
      console.error("Error updating donor:", error);
      throw error;
    }
  };

  return { fetchDonors, postDonor, updateDonor };
};

export const useDonors = () => {
  const { fetchDonors } = useDonorService();

  return useQuery({
    queryKey: ['donors'],
    queryFn: fetchDonors,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export function useAddDonor() {
  const queryClient = useQueryClient();
  const { postDonor } = useDonorService();

  return useMutation({
    mutationFn: postDonor,
    onMutate: async (newDonor) => {
      await queryClient.cancelQueries({ queryKey: ['donors'] });
      const previous = queryClient.getQueryData(['donors']);

      queryClient.setQueryData<Donor[]>(['donors'], (old) => {
        return [...(old || []), newDonor];
      });

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['donors'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['donors'] });
    },
  });
}

export function useUpdateDonor() {
  const queryClient = useQueryClient();
  const { updateDonor } = useDonorService();

  return useMutation({
    mutationFn: updateDonor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['donors'] });
    },
  });
}
