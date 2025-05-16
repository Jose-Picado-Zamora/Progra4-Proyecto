import { createRoot } from 'react-dom/client';
import './index.css';
import { AuthProvider } from './Context/AuthContext.tsx';
import { RouterProvider } from '@tanstack/react-router';
import router from './routes.tsx';


createRoot(document.getElementById('root')!).render(

  <AuthProvider>
    <RouterProvider router= {router}/>
  </AuthProvider>
  
);
