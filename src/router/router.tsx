import { Suspense, lazy, FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import pages from './routes';
import AuthGuard from 'src/Guards/authGuard/AuthGuard';
import Unverified from 'src/pages/Fallbacks/Status/Unverified/Unverified';

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
        /**
         * This is the root path API_URL
         */
        path: '',
        /**
         * This is a basic container element without any Navbars or Sidebars
         */
        element: <BaseLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to={pages.home.path} replace/>,
            },
            {
                path: '/home',
                element: <Navigate to={pages.home.path} replace/>,
            },
            {
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
            {
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
            {
                path: '*',
                element: <Status404/>,
            },
        ],
    },
    {
        /**
         * This is a sub path. All children element are located at API_URL/sidebar/{children}
         */
        path: 'sidebar',
        element: (
            /**
             * All children with this element will have a Sidebar and top Navbar
             */
            <AuthGuard>
                <SidebarLayout/>
            </AuthGuard>
        ),
        children: [
            {
                path: '',
                element: <Navigate to={pages.home.name} replace/>,
            },
            {
                path: pages.home.name,
                element: <Home/>,
            },
        ],
    },
];

export default routes;
