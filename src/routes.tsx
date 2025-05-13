import RootLayout from "./Components/RootLayout";
import ProjectsPage from "./Pages/ProjectsPages";
import DonadoresPage from "./Pages/Donadores";

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

const donadoresRoute = createRoute({ 
  getParentRoute: () => rootRoute,
  path: "/donadores",
  component: DonadoresPage,
});

rootRoute.addChildren([
    projectsRoute,
    donadoresRoute
]);


const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;

