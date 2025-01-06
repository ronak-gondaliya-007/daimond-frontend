import { lazy } from "react";
import { LAYOUTS } from "../constant";

//public Route
const Login = lazy(() => import("../pages/Login"));
const Stock = lazy(() => import("../pages/Stock"));
const StockForm = lazy(() => import("../pages/Stock/Form"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));

// common routes
const Dashboard = lazy(() => import("../pages/Dashboard"));
const RolesPermission = lazy(() => import("../pages/roles-permission/RolesPermission"));
const RolesPermissionForm = lazy(() => import("../pages/roles-permission/Form"));

const { MAIN, DASHBOARD_LAYOUT } = LAYOUTS;

export const publicRoutes = [
    {
        path: "/login",
        element: Login,
        title: "Login",
        layout: ""
    },
    {
        path: "/forgot-password",
        element: ForgotPassword,
        title: "ForgotPassword",
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

    // --> Management
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
    },
    {
        path: '/roles-permission',
        element: RolesPermission,
        title: "Roles & Permission",
        layout: DASHBOARD_LAYOUT,
        breadcrumb: ["Management", "Users"]
    },
    {
        path: '/roles-permission/add',
        element: RolesPermissionForm,
        title: "Roles & Permission",
        layout: MAIN,
        breadcrumb: ["Management", "Users", "Add"]
    }
];
