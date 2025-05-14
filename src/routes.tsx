import RootLayout from "./Components/RootLayout";
import ProjectsPage from "./Pages/ProjectsPages";
import DonorsPage from "./Pages/Donors";
import VolunteersPage from "./Pages/VolunteersPage";
import EntrepreneursPage from "./pages/Entrepreneurs";

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
  path: "/donors",
  component: DonorsPage,
});

const volunteersRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/volunteers",
    component: VolunteersPage,
}); 

const entrepreneursRoute =createRoute({
    getParentRoute: () => rootRoute,
    path: "/entrepreneurs",
    component: EntrepreneursPage,
});

rootRoute.addChildren([
    projectsRoute,
    donorsRoute,
    volunteersRoute,
    entrepreneursRoute,
]);

const router = createRouter({
    routeTree: rootRoute,
    history: createBrowserHistory(),
    defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;

