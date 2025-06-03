import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import AuthPages from "../pages/AuthPages"

export const authRoute  = createRoute({
    getParentRoute: () => rootRoute,
    path: '/auth',
    component: AuthPages
})