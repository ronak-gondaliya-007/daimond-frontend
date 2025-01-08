import { lazy } from "react";
import { LAYOUTS } from "../constant";

//public Route
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));

// common routes
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SellInvoice = lazy(() => import("../pages/sell-invoice"));
const Memo = lazy(() => import("../pages/memo"));
const Stock = lazy(() => import("../pages/Stock"));
const StockForm = lazy(() => import("../pages/Stock/Form"));
const Customer = lazy(() => import("../pages/Customer"));
const CustomerAdd = lazy(() => import("../pages/Customer/Form"));
const RolesPermission = lazy(() => import("../pages/roles-permission/RolesPermission"));
const RolesPermissionForm = lazy(() => import("../pages/roles-permission/Form"));
const ReportsAnalytics = lazy(() => import("../pages/reports-analytics/ReportsAnalytics"));

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
    {
        path: '/sell-invoice',
        element: SellInvoice,
        title: "Sell / Invoice",
        layout: MAIN,
        breadcrumb: ["Management", "Sell / Invoice"]
    },

    // --> Management
    {
        path: '/memo',
        element: Memo,
        title: "Memo",
        layout: MAIN,
        breadcrumb: ["Management", "Memo"]
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
    },
    {
        path: '/customer',
        element: Customer,
        title: "Customer",
        layout: MAIN,
        breadcrumb: ["Management", "Customer"]
    },
    {
        path: '/customer/add',
        element: CustomerAdd,
        title: "Customer Add",
        layout: MAIN,
        breadcrumb: ["Management", "Customer", "Add"]
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
    },

    // Other
    {
        path: '/reports-analytics',
        element: ReportsAnalytics,
        title: "Reports & Analytics",
        layout: MAIN,
        breadcrumb: ["Other", "Reports & Analytics"]
    }
];
