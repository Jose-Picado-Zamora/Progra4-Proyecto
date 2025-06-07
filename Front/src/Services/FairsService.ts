import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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

export type Fair = {
  id: number;
  name: string;
  description: string;
  location: string;
  date: string;
};

export const useFairService = () => {
  const client = useAuthorizedClient();

  const fetchFairs = async (): Promise<Fair[]> => {
    const response = await client.get('/api/fairs');
    return response.data;
  };

  const postFair = async (newFair: Fair) => {
    const response = await client.post('/api/fairs', newFair);
    if (response.status !== 200 && response.status !== 201) {
      throw new Error("Error adding fair");
    }
    return response.data;
  };

  const updateFair = async (updatedFair: Fair) => {
    const response = await client.put(`/api/fairs/${updatedFair.id}`, updatedFair);
    return response.data;
  };

  return { fetchFairs, postFair, updateFair };
};

export const useFairs = () => {
  const { fetchFairs } = useFairService();
  return useQuery({
    queryKey: ['fairs'],
    queryFn: fetchFairs,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export const useAddFair = () => {
  const queryClient = useQueryClient();
  const { postFair } = useFairService();

  return useMutation({
    mutationFn: postFair,
    onMutate: async (newFair) => {
      await queryClient.cancelQueries({ queryKey: ['fairs'] });
      const previous = queryClient.getQueryData(['fairs']);

      queryClient.setQueryData<Fair[]>(['fairs'], (old) => [...(old || []), newFair]);

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['fairs'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['fairs'] });
    },
  });
};

export const useUpdateFair = () => {
  const queryClient = useQueryClient();
  const { updateFair } = useFairService();

  return useMutation({
    mutationFn: updateFair,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['fairs'] });
    },
  });
};