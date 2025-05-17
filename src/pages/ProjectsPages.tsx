import ProjectsList from "../Components/ProjectsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProjectsButton from "../Components/AddProjectsButton";



const ProjectsPage = () => {

    const queryClient = new QueryClient();

    
    return (
        <QueryClientProvider client={queryClient}>
            <div className="p-4">
                <AddProjectsButton />
                <ProjectsList />
                
            </div>
        </QueryClientProvider>
    );
}
export default ProjectsPage;