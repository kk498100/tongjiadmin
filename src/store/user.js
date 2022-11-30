import create from 'zustand'
import jsCookie from 'js-cookie'

export const useUserStore = create((set) => ({
    isLogin: jsCookie.get('_TOKEN_KEY_') ?? false,
    loginIn: () => set(() => ({ isLogin: true })),
    loginOut: () => set(() => {
        jsCookie.remove('_TOKEN_KEY_')
        window.history.replaceState(null, '')
        return { isLogin: false }
    }),

    role: 1,
    setRole: () => set(role => ({ role }))
}))