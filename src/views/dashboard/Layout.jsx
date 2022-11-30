/**
 * @description 控制台布局界面
 */
import { useLoaderData } from 'react-router-dom'
import styles from './layout.module.scss'
import LogoImg from '@/assets/imgs/logo.png'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Online from '@/components/Online/index.jsx'
import {
    IconNotification,
    IconCaretDown,
    IconPoweroff,
    IconMenuUnfold,
    IconMenuFold
} from '@arco-design/web-react/icon'
import { Badge, Layout, Menu, Popover } from '@arco-design/web-react'
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
        noReadCount,
        loginOut
    } = useLayout()

    const [popupVisible, setPopupVisible] = useState(false)

    const toggleVisible = () => {
        setPopupVisible(!popupVisible)
    }

    const menuLoginOut = () => {
        loginOut()
        toggleVisible()
    }

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

            { useMemo(() => (
                <Popover
                    popupVisible={ popupVisible }
                    onVisibleChange={ visible => {
                        if (visible) {
                            setPopupVisible(true)
                        }
                    } }
                    position='br'
                    content={
                        <Menu>
                            <Menu.Item
                                key='logout'
                                onClick={ () => menuLoginOut() }
                            >
                                <IconPoweroff style={ { marginRight: '6px' } } />
                                退出登陆
                            </Menu.Item>
                        </Menu>
                    }
                    trigger='click'
                    className={ styles.layoutNavbarPopup }
                >
                    <div
                        className={ styles.layoutNavbarContentUserInfo }
                        onClick={ toggleVisible }
                    >
                        <img
                            src={ c ? c : DefaultAvatar }
                            className={ styles.layoutNavbarContentUserInfoAvatar }
                            onError={ el => el.target.src = DefaultAvatar }
                        />
                        <span className={ styles.layoutNavbarContentUserInfoName }>{ a }</span>
                        <IconCaretDown style={ { fontSize: '10px', marginLeft: '2px' } } />
                    </div>
                </Popover>
            ), [a, c, popupVisible]) }
        </div>
    )
}

const LayoutNavbar = () => {
    return (
        <div className={ styles.layoutNavbar }>
            <div className={ styles.layoutNavbarLogoWrapper }>
                <img
                    src={ LogoImg }
                    width={ 33 }
                    height={ 33 }
                    className={ styles.layoutNavbarLogo }
                />
            </div>

            <LayoutNavbarContent />
        </div>
    )
}

const LayoutSlider = () => {
    const [collapsed, setCollapsed] = useState(false)
    const menuWidth = collapsed ? 48 : 220

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Layout.Sider
            className={ styles.layoutSliderWrapper }
            trigger={ null }
            collapsible
            breakpoint='md'
            width={ menuWidth }
        >
            <Menu
                className={ styles.layoutSliderWrapperMenuWrapper }
            >

            </Menu>
            <div
                className={ styles.layoutSliderWrapperCollapseBtn }
                onClick={ toggleCollapse }
            >
                { collapsed ? <IconMenuUnfold /> : <IconMenuFold /> }
            </div>
        </Layout.Sider>
    )
}

const PageLayout = () => {
    const { baseInfo } = useLoaderData()
    return (
        <BaseInfoContext.Provider value={ baseInfo }>
            <LayoutNavbar />

            <Layout>
                { useMemo(() => <LayoutSlider />, []) }
            </Layout>
        </BaseInfoContext.Provider>
    )
}

export default PageLayout