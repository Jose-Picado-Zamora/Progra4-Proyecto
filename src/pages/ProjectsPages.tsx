import ProjectsList from "../Components/ProjectsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProjectsButton from "../Components/AddProjectsButton";
//import { useContext } from "react";
//import { AuthContext } from "../Context/AuthContext";


const ProjectsPage = () => {

    const queryClient = new QueryClient();

    //const projects = useContext(AuthContext);
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