import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const BIN = '6822aa6e8960c979a598516e';
const VOLUNTEERS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN;
const API_KEY = '$2a$10$kcsGIb0kADjvgFmd6WhbruqwCdNaU0mA1ZPKoV6T23K1RNxzoC8ou';

const fetchVolunteers = async () => {
  try {
    const response = await axios.get(VOLUNTEERS_API_URL, {
      headers: {
        'X-Access-Key': API_KEY,
      }
    });
    return response.data.record.volunteers;
  }
  catch (error) {
    console.error('Error fetching volunteers:', error);

    return [];

  }
};

type Volunteer = {

  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  rol: string;  
}

export async function postVolunteers(newVolunteer: Volunteer) {

  const volunteers = await fetchVolunteers();

  volunteers.push(newVolunteer);

  try {
    const response = await axios.put(
      VOLUNTEERS_API_URL,
      { volunteers: volunteers },
      {
        headers: {
          'X-Access-Key': API_KEY,
        }
      }
    );

    if (response.status != 200)
      throw new Error("Error adding volunteers");

    return newVolunteer;
  } catch (error) {
    console.error("Error adding volunteers:", error);
  }

}

export function useAddVolunteers() {
  const queryClient = useQueryClient()

  // **Optimistic update**: before the request fires
  return useMutation({
    mutationFn: postVolunteers,
    onMutate: async (newVolunteer) => {
      await queryClient.cancelQueries({ queryKey: ['volunteers'] })
      const previous = queryClient.getQueryData(['volunteers'])

      queryClient.setQueryData<Volunteer[]>(['volunteers'], (old) => {
        return [...(old || []), newVolunteer];
      });

      return { previous }
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['volunteers'], context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey:['volunteers']})
    }
  })
}

export const useVolunteers = () => {
  return useQuery({
    queryKey: ['volunteers'],
    queryFn: fetchVolunteers,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};