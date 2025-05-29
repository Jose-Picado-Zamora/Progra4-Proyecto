import RootLayout from "./Components/RootLayout";
import ProjectsPage from "./Pages/ProjectsPage";
import DonorsPage from "./Pages/DonorsPage";
import VolunteersPage from "./Pages/VolunteersPage";
import EntrepreneursPage from "./Pages/EntrepreneursPage";
import FairsPage from "./Pages/FairsPage";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";

import {
  createRootRoute,
  createRoute,
  createRouter,
  createBrowserHistory
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: RootLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
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

const entrepreneursRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/entrepreneurs",
  component: EntrepreneursPage,
});

const fairsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fairs",
  component: FairsPage,
});

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    component: LoginPage,
}); 


rootRoute.addChildren([
  homeRoute,
  projectsRoute,
  donorsRoute,
  volunteersRoute,
  entrepreneursRoute,
  fairsRoute,
  loginRoute,
]);

const router = createRouter({
  routeTree: rootRoute,
  history: createBrowserHistory(),
  defaultErrorComponent: () => <div>Something went wrong</div>,
});

export default router;
