import { memo } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import NotFound from "pages/404/NotFound";
import { privateRoutes, publicRoutes } from "routes";
import PublicRouter from "./publicRouter";
import PrivateRouter from "./privateRouter";
import { ToastContainer } from "react-toastify";

function RoutesComponent() {
    const isAuthenticated = () => {
        const authDetails = JSON.parse(localStorage.getItem("authDetails"));
        const token = localStorage.getItem("token");
        if (!token && !authDetails) {
            localStorage.removeItem("authDetails");
            return false;
        }
        return true;
    };

    const render = () => {
        return (
            <>
                {/* Public Route List  */}
                {publicRoutes.map(({ title, path, element: Element, ...rest }) => (
                    <Route
                        key={title}
                        element={<PublicRouter title={title} {...rest} auth={isAuthenticated()} />}
                    >
                        <Route path={path} element={<Element />} />
                    </Route>
                ))}

                {/* Private Route List */}
                {privateRoutes.map(({ title, path, allowedRoles, element: Element, ...rest }) => (
                    <Route
                        key={title}
                        element={
                            <PrivateRouter allowedRoles={allowedRoles} title={title} {...rest} auth={isAuthenticated()} />
                        }
                    >
                        <Route path={path} element={<Element />} />
                    </Route>
                ))}

                <Route path={'/*'} element={<NotFound />} />
            </>
        )
    }

    const router = createBrowserRouter(createRoutesFromElements(render()));

    return <> <ToastContainer /><RouterProvider router={router} /></>

}

export default memo(RoutesComponent)