import { useEffect, useState } from 'react'
import { fetchNoReadNotify } from '@/api/user.js'
import { useUserStore } from '@/store/user.js'

export const useLayout = () => {
    const [noReadCount, setNoReadCount] = useState(0)

    const getNoReadCount = async () => {
        try {
            const {
                count: a = 0
            } = await fetchNoReadNotify()
            setNoReadCount(a)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getNoReadCount()
    }, [])

    const loginOut = useUserStore(state => state.loginOut)

    return {
        noReadCount,
        loginOut
    }
}