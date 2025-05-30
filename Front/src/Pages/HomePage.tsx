import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "../Components/Login";
import { useAuth } from "../Context/AuthContext.js";
const HomePage = () => {
  const queryClient = new QueryClient();
  const { user } = useAuth(); 
  return (
    
    <>{!user?
      ( <QueryClientProvider client={queryClient}>
     <Login />
    </QueryClientProvider>)
      :
      ( <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <div className="flex justify-center mb-6">
            <img src="/turtle-icon.svg" alt="Admin Logo" className="w-32 h-32 rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Welcome to the Admin Dashboard
          </h1>
          <p className="text-gray-600 text-center">
            You have successfully accessed the administrative area. From here, you can manage your site's content, users, and settings.
          </p>
        </div>
      </div>)
      } </>
    
  );
};

export default HomePage;