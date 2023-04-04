import { lazy } from 'react'
import PageError from '@/views/errorPage/index.jsx'
import { Navigate } from 'react-router-dom'
import PageNotFound from '@/views/notFound/index.jsx'

const PageNotificationMy = lazy(() => import('./my'))

export default [
    {
        path: 'notification',
        children: [
            {
                path: 'my',
                element: <PageNotificationMy />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 我的消息'
                }
            },
            {
                path: '*',
                element: <Navigate
                    to={ 'my' }
                    replace />
            },
            {
                path: '*',
                element: <PageNotFound />,
                loader: () => {
                    window.document.title = '页面找不到了'
                }
            }
        ]
    }
]