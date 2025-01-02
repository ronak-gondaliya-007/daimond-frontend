import { memo, Suspense } from "react";
import { useLocation, Navigate } from "react-router-dom";
import Loader from "../components/loader";

const PublicRouter = ({ title, element: Element }) => {
    const location = useLocation();
    const auth = false;

    let redirectPath = "/dashboard";

    return true ? (
        <Suspense fallback={<Loader />}>
            <Element title={title} />
        </Suspense>
    ) : (
        <Navigate to={redirectPath} state={{ from: location }} replace />
    );
};

export default memo(PublicRouter);
