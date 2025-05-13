import RootLayout from "./Components/RootLayout";
import ProjectsPage from "./Pages/ProjectsPages";
import DonorsPage from "./Pages/Donors";

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

const donorsRoute = createRoute({ 
  getParentRoute: () => rootRoute,
  path: "/donadores",
  component: DonorsPage,
});

rootRoute.addChildren([
    projectsRoute,
    donorsRoute
]);


const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;

