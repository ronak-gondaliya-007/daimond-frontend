import { memo, Suspense } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const PublicRouter = ({ title, element: Element }) => {
    const location = useLocation();
    const auth = false;

    let redirectPath = "/dashboard";

    return true ? (
        <Suspense fallback={<div>Loading...</div>}>
            <Element title={title} />
        </Suspense>
    ) : (
        <Navigate to={redirectPath} state={{ from: location }} replace />
    );
};

export default memo(PublicRouter);
