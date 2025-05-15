import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BIN = '68242e5b8960c979a5992402';

const ENTREPRENEURS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN ;

const API_KEY = '$2a$10$vxfs1Ni5wH6nB3b8wAl9yOaD8m0h2zoKClpRqb15mmjeFsHtFuTUO';

const fecthEntrepreneurs = async () =>{
  try {
    const response = await axios.get(ENTREPRENEURS_API_URL,{
        headers: {
            'X-Access-Key': API_KEY,
        }
    });
    return response.data.record.entrepreneurs;
  }  
  catch (error){
    console.error('Error fetching Entrepreneurs:', error);

    return[];
  }
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
export async function postEntrepreneur(newEntrepreneur: Entrepreneur) {
  const entrepreneurs = await fecthEntrepreneurs();
  entrepreneurs.push(newEntrepreneur);

  try {
    const response = await axios.put(
      ENTREPRENEURS_API_URL,
      { entrepreneurs: entrepreneurs },
      {
        headers: {
          'X-Access-Key': API_KEY,
        },
      }
    );

    if (response.status !== 200) throw new Error('Error adding entrepreneur');

    return newEntrepreneur;
  } catch (error) {
    console.error('Error adding entrepreneur:', error);
  }
}
export function useAddEntrepreneurs() {
  const queryClient = useQueryClient();

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

export const useEntrepreneurs = () => {
  return useQuery({
    queryKey: ['entrepreneurs'],
    queryFn: fecthEntrepreneurs,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};