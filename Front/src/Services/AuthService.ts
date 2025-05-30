import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const client = axios.create({
  baseURL: "https://localhost:7210",
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginParams = {
  email: string;
  password: string;
};

export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
};

export async function login({ email, password }: LoginParams): Promise<string> {
  const { data } = await client.post<{ token: string }>("login", {
    email,
    password,
  });
  return data.token;
}

export function decodeToken(token: string): User{
   return jwtDecode<User>(token);
}
