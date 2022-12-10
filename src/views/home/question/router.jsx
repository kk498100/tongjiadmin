import { lazy } from 'react'
import PageError from '@/views/errorPage/index.jsx'
import { Navigate } from 'react-router-dom'
import PageNotFound from '@/views/notFound/index.jsx'

const PageQuestionList = lazy(() => import('./list'))
const PageQuestionData = lazy(() => import('./data'))
const PageQuestionSubmitList = lazy(() => import('./submit'))

export default [
    {
        path: 'question',
        children: [
            {
                path: 'list',
                element: <PageQuestionList />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 问卷列表'
                }
            },
            {
                path: 'submitList',
                element: <PageQuestionSubmitList />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 填报列表'
                }
            },
            {
                path: 'data',
                element: <PageQuestionData />,
                errorElement: <PageError errorMsg={ '页面出错啦' } />,
                loader: () => {
                    window.document.title = '用户中心 - 问卷统计'
                }
            },
            {
                path: '',
                element: <Navigate
                    to={ 'list' }
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