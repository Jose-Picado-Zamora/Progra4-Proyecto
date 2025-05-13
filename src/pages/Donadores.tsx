import DonadoresList from "../Components/DonadoresList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Donadores = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-4">
        <DonadoresList />
      </div>
    </QueryClientProvider>
  );
};

export default Donadores;
