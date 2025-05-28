import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from '@tanstack/react-router';
import { AuthProvider } from './Context/AuthContext';
import router from './routes.tsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider >
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
  ,
);
