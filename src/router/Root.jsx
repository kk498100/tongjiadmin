import { Outlet, useNavigate } from "react-router-dom";
import { useUserStore } from "@/store/user.js";
import { useEffect, Suspense } from "react";
import { Spin } from '@arco-design/web-react'

function Root () {
    const isLogin = useUserStore(state => state.isLogin)
    const navigate = useNavigate()

    useEffect(() => {
        !isLogin && navigate('/login', { replace: true })
        isLogin && navigate('/dashboard', { replace: true })
    }, [isLogin])

    return (
        <Suspense fallback={
            <div style={ {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh'
            } }>
               <Spin dot />
           </div>
        }>
            <Outlet />
        </Suspense>
    )
}

export default Root