import {lazy} from "react";
const PageLogin = lazy(() => import('./Index.jsx'))

export default [{
    path: '/login',
    element: <PageLogin/>,
    loader: () => {
        return window.document.title = '管理后台 - 用户登陆'
    },
    index: true
}]