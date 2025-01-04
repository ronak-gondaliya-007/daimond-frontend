import { lazy } from "react";

//publicRoute
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Stock = lazy(() => import("../pages/Stock"));
const StockForm = lazy(() => import("../pages/Stock/Form"));

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
    },
    {
        path: '/stock',
        element: Stock,
        title: "Stock"
    },
    {
        path: '/stock-add',
        element: StockForm,
        title: "StockAdd"
    },
    {
        path: '/stock-edit',
        element: StockForm,
        title: "StockEdit"
    }
];

export const privateRoutes = [
    {
        path: '/',
        element: Dashboard,
        title: "Dashboard"
    }
];