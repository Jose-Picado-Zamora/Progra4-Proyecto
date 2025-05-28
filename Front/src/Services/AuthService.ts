import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const client = axios.create({
  baseURL: "http://localhost:5173",
  headers: {
    "Content-Type": "application/json",
  },
});

type LoginParams = {
  email: string;
  password: string;
};

export async function login({ email, password }: LoginParams): Promise<string> {
  const { data } = await client.post<{ token: string }>("login", {
    email,
    password,
  });
  return data.token;
}

export function decodeToken(token: string) {
  return jwtDecode(token);
}
