import { memo, Suspense } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import Loader from "../components/loader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../components/error-boundary-fallback/ErrorBoundaryFallback";
import Layout from "../components/layout/Layout";
import { LAYOUTS } from "../constant";
import DashboardLayout from "components/layout/DashboardLayout";

const PublicRouter = ({ title, layout }) => {

    const location = useLocation();
    const auth = false;
    const rootPath = "/dashboard";

    const { MAIN, DASHBOARD_LAYOUT } = LAYOUTS;

    function getLayout() {
        switch (layout) {
            case MAIN:
                return (
                    <Layout>
                        <Outlet />
                    </Layout>
                )

            case DASHBOARD_LAYOUT:
                return (
                    <DashboardLayout>
                        <Outlet />
                    </DashboardLayout>
                )

            default:
                return <Outlet />
        }
    }


    switch (true) {
        case !!auth:
            return (
                <Navigate to={rootPath} state={{ from: location }} replace />
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
