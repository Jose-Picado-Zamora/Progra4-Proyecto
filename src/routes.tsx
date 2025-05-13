import RootLayout from "./Components/RootLayout";
import ProjectsPage from "./Pages/ProjectsPages";
import DonorsPage from "./Pages/Donors";
import VolunteersPage from "./Pages/VolunteersPage";

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

const volunteersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/volunteers",
    component: VolunteersPage,
}); 

rootRoute.addChildren([
    projectsRoute,
    donorsRoute,
    volunteersRoute,
]);

const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;

