import { memo } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import CommonRouter from "./CommonRouter";
import NotFound from "pages/not-found/NotFound";
import { commonRoutes, publicRoutes } from "routes";
import PublicRouter from "./publicRouter";

function RoutesComponent() {


    const render = () => {

        return (
            <>

                {/* Public Route List  */}
                {publicRoutes.map(({ title, path, element: Element, ...rest }) => (
                    <Route key={title} element={<PublicRouter title={title} {...rest} />}>
                        <Route path={path} element={<Element />} />
                    </Route>
                ))}

                {/* Private Route List */}
                {/* {privateRouteList.map(({ title, path, allowedRoles, element: Element, ...rest }) => (
                    <Route key={title} element={<PrivateRouter allowedRoles={allowedRoles} title={title} {...rest} />}>
                        <Route path={path} element={<Element />} />
                    </Route>
                ))} */}

                {/* common Route List  */}
                {commonRoutes.map(({ title, path, element: Element, ...rest }) => (
                    <Route key={title} element={<CommonRouter title={title} {...rest} />}>
                        <Route path={path} element={<Element />} />
                    </Route>
                ))}

                <Route path={'/*'} element={<NotFound />} />

            </>
        )
    }

    const router = createBrowserRouter(createRoutesFromElements(render()));

    return <RouterProvider router={router} />

}

export default memo(RoutesComponent)