import { createRootRoute } from "@tanstack/react-router"
import { homePageRoute } from "./homepage"
import { authRoute } from "./auth.routing"
import { dashboardRoute } from "./dashboard"
import RootLayout from "../App.jsx"

export const rootRoute = createRootRoute({
    component: RootLayout
})

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute
])