import PageNotFound from '@/views/notFound/index.jsx'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import PageError from '@/views/errorPage/index.jsx'

const PageUserManage = lazy(() => import('./manage'))
const PageUserMiniprogram = lazy(() => import('./miniprogram'))
const PageUserSetting = lazy(() => import('./setting'))

export default [
    {
        path: 'user',
        errorElement: <PageError errorMsg={ '页面出错啦' } />,
        children: [
            {
                path: 'manage',
                element: <PageUserManage />,
                loader: () => {
                    window.document.title = '用户中心 - 后台用户'
                },
                errorElement: <PageError errorMsg={ '页面出错啦' } />
            },
            {
                path: 'miniprogram',
                element: <PageUserMiniprogram />,
                loader: () => {
                    window.document.title = '用户中心 - 小程序用户'
                },
                errorElement: <PageError errorMsg={ '页面出错啦' } />
            },
            {
                path: 'setting',
                element: <PageUserSetting />,
                loader: () => {
                    window.document.title = '用户中心 - 值班设置'
                },
                errorElement: <PageError errorMsg={ '页面出错啦' } />
            },
            {
                path: '',
                element: <Navigate
                    to={ 'manage' }
                    replace
                />
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