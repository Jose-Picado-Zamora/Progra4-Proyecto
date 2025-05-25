import DonorsList from "../Components/DonorsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddDonorsButton from "../Components/AddDonorsButton";

const Donors = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <AddDonorsButton />
        <DonorsList />
      </div>
    </QueryClientProvider>
  );
};

export default Donors;
