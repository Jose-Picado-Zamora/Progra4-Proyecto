import ProjectsList from "../Components/ProjectsList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProjectsButton from "../Components/AddProjectsButton";
import { useAuth } from "../Context/AuthContext.js";
import Login from "../Components/Login.js";


const ProjectsPage = () => {

    const queryClient = new QueryClient();

    const { user } = useAuth(); 

    return (
        <QueryClientProvider client={queryClient}>
            {user?
              <div className="p-4">
                <AddProjectsButton />
                <ProjectsList />

            </div>
            : <Login/>
            }
        </QueryClientProvider>
    );
}
export default ProjectsPage;