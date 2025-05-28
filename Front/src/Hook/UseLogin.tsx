import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../Services/AuthService';

type LoginParams = {
  email: string;
  password: string;
};

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation<string, Error, LoginParams>({
    mutationFn: async ({ email, password }) => {
      return await login({ email, password }); 
    },

    onSuccess: (token) => {
      queryClient.setQueryData(['authToken'], token);
    },

    onError: (err: Error) => {
      console.error('Login failed:', err.message);
    },
  });
}
