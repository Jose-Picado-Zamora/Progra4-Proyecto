import AddVolunteersButton from "../Components/AddVolunteersButton";
import VolunteersList from "../Components/VolunteersList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext.js";
import Login from "../Components/Login.js";
const VolunteersPage = () => {
    const queryClient = new QueryClient();
    const { user } = useAuth(); 
    return (
   <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
               <AddVolunteersButton />
               <VolunteersList />
          </div>
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
    );
}

export default VolunteersPage;