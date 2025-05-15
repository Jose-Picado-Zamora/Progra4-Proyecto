import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export type Fair = {
  id?: number;
  name: string;
  date: string;
  location: string;
  type: string;
  objective: string;
  organizer: string;
  details: string;
  audience: string;
};

const BIN_ID = "682547508561e97a50141ff4";
const API_KEY = "$2a$10$3GDIRQCyqLcMLR8sfDsjoO6JZHs155sD6QhZAOQAiZX1oxTGFY9OO";
const BASE_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

// GET 
export const useFairs = () => {
  return useQuery<Fair[]>({
    queryKey: ["fairs"],
    queryFn: async () => {
      const res = await fetch(BASE_URL, {
        headers: {
          "X-Master-Key": API_KEY
        }
      });
      if (!res.ok) throw new Error("Failed to load fairs");
      const json = await res.json();
      return json.record ?? [];
    },
  });
};

// PUT 
export const useAddFair = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newFair: Fair) => {

      const res = await fetch(BASE_URL, {
        headers: { "X-Master-Key": API_KEY }
      });
      const json = await res.json();
      const current = json.record ?? [];

      const nextId = current.length > 0
        ? Math.max(...current.map((f: Fair) => f.id ?? 0)) + 1
        : 1;

      const updated = [...current, { id: nextId, ...newFair }];

      const putRes = await fetch(BASE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Master-Key": API_KEY
        },
        body: JSON.stringify(updated),
      });

      if (!putRes.ok) throw new Error("Failed to update fair list");
      return putRes.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fairs"] });
    },
  });
};
