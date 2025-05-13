import AddVolunteersButton from "../Components/AddVolunteersButton";
import VolunteersList from "../Components/VolunteersList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const VolunteersPage = () => {
    const queryClient = new QueryClient();
    
    return (
        <QueryClientProvider client={queryClient}>
            <div className="p-4">
                <AddVolunteersButton />
                <VolunteersList />
            </div>
        </QueryClientProvider>
    );
}

export default VolunteersPage;