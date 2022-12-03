import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.js";
import { useEffect } from "react";

function Root () {
    const isLogin = useUserStore(state => state.isLogin)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const path = location.pathname
        !isLogin && path !== '/login' && navigate('/login', { replace: true })
        isLogin && path === '/login' && navigate('/', { replace: true })
    }, [isLogin])

    return (
        <Outlet />
    )
}

export default Root