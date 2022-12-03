import { fetchBaseInfo } from '@/api/user.js'
import { Navigate } from 'react-router-dom'

import Layout from './Layout'
import PageError from '@/views/errorPage/index'
import PageNotFound from '@/views/notFound/index.jsx'

import dashboardRoute from './dashboard/router'
import userRoute from './user/router'
import questionRoute from './question/router'
import infoRoute from './info/router'
import notificationRoute from './notification/router'
import aboutRoute from './about/router'

export default [
    {
        path: '/',
        element: <Layout />,
        loader: async () => {
            window.document.title = '用户中心'
            try {
                const baseInfo = await fetchBaseInfo()
                return { baseInfo }
            } catch (e) {
                console.log(e)
            }
        },
        errorElement: <PageError errorMsg={ '页面出错啦' } />,
        children: [
            ...dashboardRoute,
            ...userRoute,
            ...questionRoute,
            ...infoRoute,
            ...notificationRoute,
            ...aboutRoute
        ]
    },
    {
        path: '',
        element: <Navigate
            to={ 'home' }
            replace
        />,
        index: true
    },
    {
        path: '*',
        element: <Layout><PageNotFound /></Layout>,
        loader: async () => {
            window.document.title = '页面找不到了'
            try {
                const baseInfo = await fetchBaseInfo()
                return { baseInfo }
            } catch (e) {
                console.log(e)
            }
        }
    }
]