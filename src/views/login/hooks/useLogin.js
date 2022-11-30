import { useRef, useState } from 'react'
import { fetchLogin } from '@/api/login.js'
import jsCookie from 'js-cookie'
import { useUserStore } from '@/store/user.js'

export const useLogin = () => {
    const formRef = useRef()
    const [loading, setLoading] = useState(false)
    const loginIn = useUserStore(state => state.loginIn)

    const loginAction = async (data = {}) => {
        const {
            userName: account = '',
            password: password = ''
        } = data

        try {
            setLoading(true)
            const {
                token: a = ''
            } = await fetchLogin({ account, password })
            await jsCookie.set('_TOKEN_KEY_', a)
            loginIn()
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    const submitClick = async () => {
        try {
            const data = await formRef.current?.validate()
            await loginAction(data)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        formRef,
        submitClick,
        loading
    }
}