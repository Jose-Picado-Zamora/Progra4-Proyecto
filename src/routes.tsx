import RootLayout from "./Components/RootLayout";
import ProjectsPage from "./Pages/ProjectsPages";


import{

createRootRoute,
createRoute,
createRouter,
createBrowserHistory

} from "@tanstack/react-router"; 



const rootRoute = createRootRoute({
    component: RootLayout,
});

const projectsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/projects",
    component: ProjectsPage,
}); 


rootRoute.addChildren([
    projectsRoute,
]);


const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;

