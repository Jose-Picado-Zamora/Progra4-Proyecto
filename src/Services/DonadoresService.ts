import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BIN = "6822a6d28960c979a5984f90";
const DONADORES_API_URL = "https://api.jsonbin.io/v3/b/" + BIN;
const API_KEY = "$2a$10$q/7rPPZIYpiuFZiF2pfXMu20KI4WFbZwI6vHnrA8IkN2jZrtdyxCG";

export type Donador = {
  id: number;
  name: string;
  email: string;
  phone: string;
  donationType: string;
  details: string;
};

const fetchDonadores = async (): Promise<Donador[]> => {
  try {
    const response = await axios.get(DONADORES_API_URL, {
      headers: {
        "X-Access-Key": API_KEY,
      },
    });

    return response.data.record.donadores ?? [];
  } catch (error) {
    console.error("Error fetching donadores:", error);
    return [];
  }
};

export const useDonadores = () => {
  return useQuery({
    queryKey: ["donadores"],
    queryFn: fetchDonadores,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
