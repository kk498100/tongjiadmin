import loginRouter from '@/views/login/router.jsx'
import homeRouter from '@/views/home/router.jsx'
import { createBrowserRouter } from "react-router-dom";
import Root from './Root.jsx'
import PageNotFound from '@/views/notFound/index.jsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            ...loginRouter,
            ...homeRouter
        ]
    },
    {
        path: '*',
        element: <PageNotFound />
    }
])

export default router