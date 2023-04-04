import { lazy } from 'react'
import PageNotFound from '@/views/notFound/index.jsx'
import PageError from '@/views/errorPage/index.jsx'

const PageAbout = lazy(() => import('./index'))
export default [
    {
        path: 'about',
        children: [
            {
                path: '',
                element: <PageAbout />,
                errorElement: <PageError errorMsg={'页面出错啦'} />,
                loader: () => {
                    window.document.title = '用户中心 - 关于我们'
                }
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