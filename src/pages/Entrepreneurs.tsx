import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EntrepreneursList from "../Components/EntrepreneurList";

const EntrepreneursPage = () =>{
    const queryClient  = new QueryClient();
    return(
        <QueryClientProvider client={queryClient}>
            <div className="p-4">
            <EntrepreneursList/>
            </div>
        </QueryClientProvider>
    );
}

export default EntrepreneursPage;