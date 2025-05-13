import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BIN = "6822a6d28960c979a5984f90";
const DONORS_API_URL = "https://api.jsonbin.io/v3/b/" + BIN;
const API_KEY = "$2a$10$q/7rPPZIYpiuFZiF2pfXMu20KI4WFbZwI6vHnrA8IkN2jZrtdyxCG";

export type Donor = {
  id: number;
  name: string;
  email: string;
  phone: string;
  donationType: string;
  details: string;
};

const fetchDonors = async (): Promise<Donor[]> => {
  try {
    const response = await axios.get(DONORS_API_URL, {
      headers: {
        "X-Access-Key": API_KEY,
      },
    });

    return response.data.record.donors ?? [];
  } catch (error) {
    console.error("Error fetching donors:", error);
    return [];
  }
};

export const useDonors = () => {
  return useQuery({
    queryKey: ["donors"],
    queryFn: fetchDonors,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};

export async function postDonor(newDonor: Donor): Promise<Donor | void> {
  const donors = await fetchDonors();
  donors.push(newDonor);

  try {
    const response = await axios.put(
      DONORS_API_URL,
      { donors },
      {
        headers: {
          "X-Access-Key": API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to add donor.");
    }

    return newDonor;
  } catch (error) {
    console.error("Error adding donor:", error);
  }
}

export function useAddDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postDonor,
    onMutate: async (newDonor) => {
      await queryClient.cancelQueries({ queryKey: ["donors"] });
      const previous = queryClient.getQueryData(["donors"]);

      queryClient.setQueryData<Donor[]>(["donors"], (old) => [
        ...(old || []),
        newDonor,
      ]);

      return { previous };
    },
    onError: (_err, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["donors"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
    },
  });
}
