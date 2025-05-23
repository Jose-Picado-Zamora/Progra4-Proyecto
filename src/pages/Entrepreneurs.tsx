import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EntrepreneursList from "../Components/EntrepreneurList";
import AddEntrepreneursButton from "../Components/AddEntrepreneursButton";

const EntrepreneursPage = () =>{
    const queryClient  = new QueryClient();
    return(
        <QueryClientProvider client={queryClient}>
            <div className="p-4">
            <AddEntrepreneursButton/>
            <EntrepreneursList/>
            </div>
        </QueryClientProvider>
    );
}

export default EntrepreneursPage;