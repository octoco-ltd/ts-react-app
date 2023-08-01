import { Suspense, lazy, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import pages from './routes';
import AuthGuard from 'src/Guards/authGuard/AuthGuard';
import Unverified from 'src/pages/Fallbacks/Status/Unverified/Unverified';
import ViewProfile from 'src/features/profile/viewProfile/ViewProfile';

const Loader = (Component: FC) => (props: any) =>
    (
        <Suspense fallback={<SuspenseLoader/>}>
            <Component {...props} />
        </Suspense>
    );

// Pages
const Home = Loader(lazy(() => import('src/pages/Home/Home')));
const Register = Loader(lazy(() => import('src/pages/Register/Register')));
const Login = Loader(lazy(() => import('src/pages/Login/Login')));

// Status
const Status404 = Loader(lazy(() => import('src/pages/Fallbacks/Status/Status404/Status404')));
const Status500 = Loader(lazy(() => import('src/pages/Fallbacks/Status/Status500/Status500')));
const StatusComingSoon = Loader(lazy(() => import('src/pages/Fallbacks/Status/ComingSoon/ComingSoon')));
const StatusMaintenance = Loader(lazy(() => import('src/pages/Fallbacks/Status/Maintenance/Maintenance')));

const routes: RouteObject[] = [
    {
        path: '',
        element: <BaseLayout/>,
        /**
        * All children within this element will NOT have a Sidebar and top Navbar
        * All children within this element does not need to be authenticated to access
        */
        children: [
            //#region Base
            {
                //Navigate to home when base routed to base path
                path: '/',
                element: <Navigate to={pages.home.path} replace/>,
            },
            //#endregion Base
            //#region Auth
            {
                //All authentication routes
                //No navbars are shown as the user is not logged in
                path: pages.auth.root,
                children: [
                    {
                        path: '',
                        element: <Login />,
                    },
                    {
                        path: pages.auth.login.name,
                        element: <Login />,
                    },
                    {
                        path: pages.auth.register.name,
                        element: <Register/>,
                    },
                ]
            },
            //#endregion Auth
            //#region Status
            {
                //All status routes
                path: pages.status.root,
                children: [
                    {
                        path: '',
                        element: <Navigate to="404" replace/>,
                    },
                    {
                        path: pages.status.unverified.name,
                        element: <Unverified/>,
                    },
                    {
                        path: pages.status.status404.name,
                        element: <Status404/>,
                    },
                    {
                        path: pages.status.status500.name,
                        element: <Status500/>,
                    },
                    {
                        path: pages.status.statusMaintenance.name,
                        element: <StatusMaintenance/>,
                    },
                    {
                        path: pages.status.statusComingSoon.name,
                        element: <StatusComingSoon/>,
                    },
                ],
            },
            //#endregion Status
            //#region NotFound
            {
                path: '*',
                element: <Status404/>,
            },
            //#endregion NotFound
        ],
    },
    {
        path: '',
        element: (
            /**
             * All children with this element will have a Sidebar and top Navbar
             * AuthGuard checks that the user is logged in before granting access to its children pages
             */
            <AuthGuard>
                <SidebarLayout/>
            </AuthGuard>
        ),
        children: [
            //#region Base
            {
                path: '',
                element: <Navigate to={pages.home.name} replace/>,
            },
            //#endregion Base
            //#region Home
            {
                path: pages.home.name,
                element: <Home/>,
            },
            //#endregion Home
            //#region Profile
            {
                path: pages.profile.root,
                children: [
                    {
                        path: pages.profile.view.path,
                        element: <ViewProfile/>,
                    },
                    {
                        path: pages.profile.edit.path,
                        element: <Home/>,
                    }
                ]
                
            },
            //#endregion Profile
        ],
    },
];

export default routes;
