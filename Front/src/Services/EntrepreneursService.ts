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

export type Entrepreneur = {
  id: number;
  name: string;
  businessName: string;
  phone: string;
  email: string;
  feriaName: string;
  standNumber: string;
  productsDescription: string;
};

export const useEntrepreneurService = () => {
  const client = useAuthorizedClient();

  const fetchEntrepreneurs = async (): Promise<Entrepreneur[]> => {
    try {
      const response = await client.get('/api/entrepreneurs');
      return response.data;
    } catch (error) {
      console.error('Error fetching entrepreneurs:', error);
      return [];
    }
  };

  const postEntrepreneur = async (newEntrepreneur: Entrepreneur) => {
    try {
      const response = await client.post('/api/entrepreneurs', newEntrepreneur);

      if (response.status !== 200 && response.status !== 201)
        throw new Error("Error adding entrepreneur");

      return response.data;
    } catch (error) {
      console.error("Error adding entrepreneur:", error);
      throw error;
    }
  };
  const updateEntrepreneur = async (updatedEntrepreneur: Entrepreneur) => {
    try {
      const response = await client.put(`/api/entrepreneurs/${updatedEntrepreneur.id}`, updatedEntrepreneur);
      if (response.status !== 200) throw new Error("Error updating entrepreneur");
      return response.data;
    } catch (error) {
      console.error("Error updating entrepreneur:", error);
      throw error;
    }
  };

  return { fetchEntrepreneurs, postEntrepreneur, updateEntrepreneur };
};

export const useEntrepreneurs = () => {
  const { fetchEntrepreneurs } = useEntrepreneurService();

  return useQuery({
    queryKey: ['entrepreneurs'],
    queryFn: fetchEntrepreneurs,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export function useAddEntrepreneurs() {
  const queryClient = useQueryClient();
  const { postEntrepreneur } = useEntrepreneurService();

  return useMutation({
    mutationFn: postEntrepreneur,
    onMutate: async (newEntrepreneur) => {
      await queryClient.cancelQueries({ queryKey: ['entrepreneurs'] });
      const previous = queryClient.getQueryData(['entrepreneurs']);

      queryClient.setQueryData<Entrepreneur[]>(['entrepreneurs'], (old) => {
        return [...(old || []), newEntrepreneur];
      });

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['entrepreneurs'], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['entrepreneurs'] });
    },
  });
}

export function useUpdateEntrepreneur() {
  const queryClient = useQueryClient();
  const { updateEntrepreneur } = useEntrepreneurService();

  return useMutation({
    mutationFn: updateEntrepreneur,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['entrepreneurs'] });
    },
  });
}