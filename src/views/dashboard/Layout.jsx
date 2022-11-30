/**
 * @description 控制台布局界面
 */
import { useLoaderData } from 'react-router-dom'
import styles from './layout.module.scss'
import LogoImg from '@/assets/imgs/logo.png'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Online from '@/components/Online/index.jsx'
import { IconNotification } from '@arco-design/web-react/icon'
import { Badge } from '@arco-design/web-react'
import { useLayout } from './useLayout.js'
import DefaultAvatar from '@/assets/imgs/avatar_default.svg'

const BaseInfoContext = createContext(null)

const LayoutNavbarContent = () => {
    const {
        nickname: a = '',
        status: b = 1,
        avatar: c = ''
    } = useContext(BaseInfoContext)

    const {
        noReadCount
    } = useLayout()
    return (
        <div className={ styles.layoutNavbarContent }>
            { useMemo(() => <Online status={ b } />, [b]) }
            { useMemo(() => <Badge
                dot
                count={ noReadCount }
                className={ styles.layoutNavbarContentNotify }
                title='消息中心'
            >
                <IconNotification />
            </Badge>, [noReadCount]) }

            { useMemo(() => <div className={ styles.layoutNavbarContentUserInfo }>
                <img
                    src={ c ? c : DefaultAvatar }
                    className={ styles.layoutNavbarContentUserInfoAvatar }
                    onError={ el => el.target.src = DefaultAvatar }
                />
                <span className={ styles.layoutNavbarContentUserInfoName }>{ a }</span>
            </div>, [a, c]) }
        </div>
    )
}

const LayoutNavbar = () => {
    return (
        <div className={ styles.layoutNavbar }>
            <img
                src={ LogoImg }
                width={ 33 }
                height={ 33 }
                className={ styles.layoutNavbarLogo }
            />

            <LayoutNavbarContent />
        </div>
    )
}

const Layout = () => {
    const { baseInfo } = useLoaderData()
    return (
        <BaseInfoContext.Provider value={ baseInfo }>
            <LayoutNavbar />
        </BaseInfoContext.Provider>
    )
}

export default Layout