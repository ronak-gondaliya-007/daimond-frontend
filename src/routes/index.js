import { lazy } from "react";
import { LAYOUTS } from "../constant";

//public Route
const Login = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/Login/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/Login/ResetPassword"));

// common routes
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SellInvoice = lazy(() => import("../pages/Sell-Invoice"));
const SellInvoiceAdd = lazy(() => import("../pages/Sell-Invoice/Form"));
const Memo = lazy(() => import("../pages/Memo"));
const CreateMemo = lazy(() => import("../pages/Memo/Form"));
const ManageInvoices = lazy(() => import("../pages/Sell-Invoice/manage-invoice"));
const MemoPreview = lazy(() => import("../pages/Memo/preview"));
const Stock = lazy(() => import("../pages/Stock"));
const StockForm = lazy(() => import("../pages/Stock/Form"));
const Customer = lazy(() => import("../pages/Customer"));
const CustomerAdd = lazy(() => import("../pages/Customer/Form"));
const RolesPermission = lazy(() => import("../pages/Roles-Permission/RolesPermission"));
const RolesPermissionForm = lazy(() => import("../pages/Roles-Permission/Form"));
const ReportsAnalytics = lazy(() => import("../pages/Reports-Analytics/ReportsAnalytics"));

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
    },
    {
        path: "/reset-password",
        element: ResetPassword,
        title: "ResetPassword",
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
        title: "Sell-Invoice",
        layout: MAIN,
        breadcrumb: ["Management", "Sell-Invoice"]
    },
    {
        path: '/sell-invoice/add',
        element: SellInvoiceAdd,
        title: "Sell-Invoice - Add",
        layout: MAIN,
        breadcrumb: ["Management", "Sell-Invoice", "Add"]
    },
    {
        path: '/sell-invoice/edit/:sellInvoiceId',
        element: SellInvoiceAdd,
        title: "Sell-Invoice - Edit",
        layout: MAIN,
        breadcrumb: ["Management", "Sell-Invoice", "Edit"]
    },
    {
        path: '/sell-invoice/preview/:sellInvoiceId',
        element: ManageInvoices,
        title: "Sell-Invoice / Manage invoices",
        layout: MAIN,
        breadcrumb: ["Management", "Sell-Invoice", "Manage Invoices"]
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
        path: '/memo/add',
        element: CreateMemo,
        title: "MemoAdd",
        layout: MAIN,
        breadcrumb: ["Management", "Memo", "Add"]
    },
    {
        path: '/memo/edit/:memoId',
        element: CreateMemo,
        title: "MemoEdit",
        layout: MAIN,
        breadcrumb: ["Management", "Memo", "Edit"]
    },
    {
        path: '/memo/preview/:memoId',
        element: MemoPreview,
        title: "Memo Preview",
        layout: MAIN,
        breadcrumb: ["Management", "Memo", "Preview"]
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
        path: '/vendor',
        element: Customer,
        title: "Vendor",
        layout: MAIN,
        breadcrumb: ["Management", "Vendor"]
    },
    {
        path: '/customer/add',
        element: CustomerAdd,
        title: "Customer Add",
        layout: MAIN,
        breadcrumb: ["Management", "Customer", "Add"]
    },
    {
        path: '/vendor/add',
        element: CustomerAdd,
        title: "Vendor Add",
        layout: MAIN,
        breadcrumb: ["Management", "Vendor", "Add"]
    },
    {
        path: '/roles-permission',
        element: RolesPermission,
        title: "Roles & Permission",
        layout: DASHBOARD_LAYOUT,
        breadcrumb: ["Management", "Roles & Permission"]
    },
    {
        path: '/roles-permission/add',
        element: RolesPermissionForm,
        title: "Roles & Permission",
        layout: MAIN,
        breadcrumb: ["Management", "Roles & Permission", "Add"]
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
