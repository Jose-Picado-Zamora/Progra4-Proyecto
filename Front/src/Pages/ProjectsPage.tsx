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
            {user ?
                // Dentro del render de ProjectsPage

                <div className="w-full px-6">
                    <div className="flex justify-end gap-4 mb-4">
                        <AddProjectsButton />
                    </div>
                    <ProjectsList />
                </div>

                : <Login />
            }
        </QueryClientProvider>
    );
}
export default ProjectsPage;