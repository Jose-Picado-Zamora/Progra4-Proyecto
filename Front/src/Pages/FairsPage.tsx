import FairsList from "../Components/FairsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddFairButton from "../Components/AddFairButton";
import { useAuth } from "../Context/AuthContext.js";
import Login from "../Components/Login.js";

const Fairs = () => {
  const queryClient = new QueryClient();
  const { user } = useAuth();

  return (
    <>
      {user ? (
        <QueryClientProvider client={queryClient}>
          <div className="p-4">
            <AddFairButton />
            <FairsList />
          </div>
        </QueryClientProvider>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Fairs;
