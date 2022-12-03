import { lazy } from 'react'
import PageError from '@/views/errorPage/index.jsx'
import { Navigate } from 'react-router-dom'
import PageNotFound from '@/views/notFound/index.jsx'

const PageInfo = lazy(() => import('./info'))
const PageInfoKnow = lazy(() => import('./know'))
const PageInfoNotice = lazy(() => import('./notice'))
const PageInfoWiki = lazy(() => import('./wiki'))

export default [
    {
        path: 'info',
        children: [
            {
                path: 'info',
                element: <PageInfo />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 资讯管理'
                }
            },
            {
                path: 'notice',
                element: <PageInfoNotice />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 公告中心'
                }
            },
            {
                path: 'wiki',
                element: <PageInfoWiki />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 百科知识'
                }
            },
            {
                path: 'know',
                element: <PageInfoKnow />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 检查须知'
                }
            },
            {
                path: '',
                element: <Navigate
                    to={ 'notice' }
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