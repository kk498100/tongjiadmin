import PageError from '@/views/errorPage/index.jsx'
import { Navigate } from 'react-router-dom'
import PageNotFound from '@/views/notFound/index.jsx'
import { lazy } from 'react'
const WorkPlace = lazy(() => import('./index'))
export default [
    {
        path: 'dashboard',
        children: [
            {
                path: 'workspace',
                element: <WorkPlace />,
                errorElement: <PageError errorMsg={'页面出错啦'} />,
                loader: () => {
                    window.document.title = '用户中心 - 工作台'
                }
            },
            {
                path: '',
                element: <Navigate
                    to={ 'workspace' }
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