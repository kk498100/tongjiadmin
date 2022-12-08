import create from 'zustand'
import jsCookie from 'js-cookie'

export const useUserStore = create(set => ({
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

export const useManageStore = create(set => ({
    drawerVisible: false,
    editType: 'add',
    editInfo: {},
    setDrawerVisible: visible => set(() => ({ drawerVisible: visible })),
    setEditType: type => set(state => {
        state.setDrawerVisible(true)
        return { editType: type }
    }),
    setEditInfo: info => set(() => ({ editInfo: info }))
}))

export const useMiniprogramStore = create(set => ({
    drawerVisible: false,
    setDrawerVisible: visible => set(() => ({ drawerVisible: visible })),
    userInfo: {},
    setUserInfo: info => set(() => ({ userInfo: info }))
}))