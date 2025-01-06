import { lazy } from "react";
import { LAYOUTS } from "../constant";

//public Route
const Login = lazy(() => import("../pages/Login"));
const Stock = lazy(() => import("../pages/Stock"));
const StockForm = lazy(() => import("../pages/Stock/Form"));

// common routes
const Dashboard = lazy(() => import("../pages/Dashboard"));

const { MAIN, DASHBOARD_LAYOUT } = LAYOUTS;

export const publicRoutes = [
    {
        path: "/login",
        element: Login,
        title: "Login",
        layout: ""
    }
];

export const privateRoutes = [
    {
        path: '/',
        element: Dashboard,
        title: "Dashboard",
        layout: DASHBOARD_LAYOUT,
        breadcrumb: ["Dashboard"]
    },
    {
        path: '/stock',
        element: Stock,
        title: "Stock",
        layout: MAIN,
        breadcrumb: ["Management", "Stock"]
    },
    {
        path: '/stock/add',
        element: StockForm,
        title: "StockAdd",
        layout: MAIN,
        breadcrumb: ["Management", "Stock", "Add"]
    },
    {
        path: '/stock/edit/:stockId',
        element: StockForm,
        title: "StockEdit",
        layout: MAIN,
        breadcrumb: ["Management", "Stock", "Edit"]
    }
];