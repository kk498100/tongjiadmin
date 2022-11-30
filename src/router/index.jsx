import loginRouter from '@/views/login/router.jsx'
import DashboardRouter from '@/views/dashboard/router.jsx'
import { createBrowserRouter } from "react-router-dom";
import Root from './Root.jsx'
import { lazy } from "react";

const PageNotFound = lazy(() => import('@/views/notFound/index.jsx'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            ...loginRouter,
            ...DashboardRouter
        ]
    },
    {
        path: '*',
        element: <PageNotFound />
    }
])

export default router