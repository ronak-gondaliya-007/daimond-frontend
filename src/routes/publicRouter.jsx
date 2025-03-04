import { memo, Suspense } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loader from "../components/loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../components/error-boundary-fallback/ErrorBoundaryFallback";
import Layout from "../components/layout/Layout";
import { LAYOUTS } from "../constant";
import DashboardLayout from "components/layout/DashboardLayout";

const PublicRouter = ({
    title,
    layout,
    breadcrumb,
    auth
}) => {
    const location = useLocation();

    const { MAIN, DASHBOARD_LAYOUT } = LAYOUTS;

    function getLayout() {
        switch (layout) {
            case MAIN:
                return (
                    <Layout breadcrumb={breadcrumb}>
                        <Outlet />
                    </Layout>
                )
            case DASHBOARD_LAYOUT:
                return (
                    <DashboardLayout breadcrumb={breadcrumb}>
                        <Outlet />
                    </DashboardLayout>
                )

            default:
                return <Outlet />
        }
    }

    switch (auth) {
        case true:
            return (
                <Navigate to={'/'} state={{ from: location }} replace />
            )
        default:
            return (
                <>
                    <title>{title}</title>
                    <ErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
                        <Suspense fallback={<Loader />}>
                            {getLayout()}
                        </Suspense>
                    </ErrorBoundary>
                </>
            )
    }
};

export default memo(PublicRouter);
