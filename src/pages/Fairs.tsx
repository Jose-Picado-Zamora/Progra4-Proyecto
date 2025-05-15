import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FairsList from "../components/FairsList";
import AddFairButton from "../components/AddFairButton";


const Fairs = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <AddFairButton />
        <FairsList />
      </div>
    </QueryClientProvider>
  );
};

export default Fairs;
