import DonorsList from "../Components/DonorsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddDonorsButton from "../Components/AddDonorsButton";
import { useAuth } from "../Context/AuthContext.js";
import Login from "../Components/Login.js";

const Donors = () => {
  const queryClient = new QueryClient();
  const { user } = useAuth(); 
  return (
     <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
           <AddDonorsButton />
            <DonorsList />
          </div>
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Donors;
