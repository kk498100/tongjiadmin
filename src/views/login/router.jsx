import PageLogin from './Index.jsx'
import PageError from '@/views/errorPage/index'

export default [{
    path: '/login',
    element: <PageLogin/>,
    loader: () => {
        return window.document.title = '管理后台 - 用户登陆'
    },
    index: true,
    errorElement: <PageError />
}]