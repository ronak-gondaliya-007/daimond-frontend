import { lazy } from "react";

//publicRoute
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));

export const publicRoutes = [
    {
        path: "/login",
        element: Login,
        title: "Login"
    },
    {
        path: '/',
        element: Dashboard,
        title: "Dashboard"
    }
];

export const privateRoutes = [
    {
        path: '/',
        element: Dashboard,
        title: "Dashboard"
    }
];