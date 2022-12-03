/**
 * @description 控制台布局界面
 */
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import styles from './layout.module.scss'
import LogoImg from '@/assets/imgs/logo.png'
import { createContext, Suspense, useContext, useMemo, useState } from 'react'
import Online from '@/components/Online/index.jsx'
import {
    IconNotification,
    IconCaretDown,
    IconPoweroff,
    IconMenuUnfold,
    IconMenuFold,
    IconDashboard,
    IconWechat,
    IconBook,
    IconFile,
    IconUserGroup,
    IconRight
} from '@arco-design/web-react/icon'
import { BackTop, Badge, Breadcrumb, Divider, Layout, Menu, Popover, Spin } from '@arco-design/web-react'
import { useLayout, useLayoutMenu } from './useLayout.js'
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

const getIconFromKey = key => {
    switch (key) {
        case 'dashboard':
            return <IconDashboard className={ styles.layoutSliderWrapperIcon } />
        case 'wechat':
            return <IconWechat className={ styles.layoutSliderWrapperIcon } />
        case 'book':
            return <IconBook className={ styles.layoutSliderWrapperIcon } />
        case 'file':
            return <IconFile className={ styles.layoutSliderWrapperIcon } />
        case 'notification':
            return <IconNotification className={ styles.layoutSliderWrapperIcon } />
        case 'about':
            return <IconUserGroup className={ styles.layoutSliderWrapperIcon } />
        default:
            return <div className={ styles.layoutSliderWrapperIconEmpty } />
    }
}

const LayoutSlider = props => {
    const {
        collapsed = false,
        setCollapsed,
        menuWidth = 220
    } = props

    const navigate = useNavigate()

    const {
        menuTab: menu = [],
        defaultOpenKeys,
        defaultSelectedKeys
    } = useLayoutMenu()

    const toggleCollapse = () => {
        setCollapsed(!collapsed)
    }

    const goPage = (path = '') => {
        navigate(path)
    }

    return (
        <Layout.Sider
            className={ styles.layoutSliderWrapper }
            trigger={ null }
            collapsible
            breakpoint='md'
            width={ menuWidth }
            onCollapse={ toggleCollapse }
            collapsed={ collapsed }
        >
            <Menu
                className={ styles.layoutSliderWrapperMenuWrapper }
                defaultOpenKeys={ defaultOpenKeys }
                defaultSelectedKeys={ defaultSelectedKeys }
            >
                {
                    menu.length && menu.map(item => (
                        <Menu.SubMenu
                            key={ item.key }
                            title={
                                <>
                                   { getIconFromKey(item.icon) } { item.title }
                                </>
                            }
                        >
                            {
                                item.children?.length && item.children?.map(childItem => (
                                    <Menu.Item
                                        key={ childItem.key }
                                        onClick={ () => goPage(childItem.path) }
                                    >
                                        { childItem.title }
                                    </Menu.Item>
                                ))
                            }
                        </Menu.SubMenu>
                    ))
                }
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

const PageLayout = ({ children = <></> }) => {
    const { baseInfo } = useLoaderData()
    const [collapsed, setCollapsed] = useState(false)
    const menuWidth = collapsed ? 48 : 220

    const {
        currentBreadcrumb
    } = useLayoutMenu()

    return (
        <BaseInfoContext.Provider value={ baseInfo }>
            {useMemo(() => <LayoutNavbar />, [])}

            <Layout>
                { useMemo(() => <LayoutSlider
                    collapsed={ collapsed }
                    setCollapsed={ setCollapsed }
                    menuWidth={ menuWidth } />, [menuWidth, collapsed]) }

                <Layout.Content
                    className={ styles.layoutContent }
                    style={ { paddingLeft: `${ menuWidth }px` } }
                >
                    <div className={ styles.layoutContentWrapper }>
                        <Breadcrumb separator={ <IconRight /> }>
                            <Breadcrumb.Item>
                                { getIconFromKey(currentBreadcrumb?.icon ?? '') }
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                { currentBreadcrumb?.title ?? '' }
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                { currentBreadcrumb?.childTitle ?? '' }
                            </Breadcrumb.Item>
                        </Breadcrumb>
                        <Divider />
                        <Layout.Content>
                            { useMemo(() => <Suspense fallback={ <div style={ {
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                height: '100vh',
                                position: 'fixed',
                                left: 0,
                                top: 0
                            } }>
                                <Spin dot />
                            </div> }>
                                <Outlet />
                            </Suspense>, []) }
                            { children }
                        </Layout.Content>
                    </div>
                </Layout.Content>

            </Layout>

            <BackTop
                visibleHeight={ 30 }
            />
        </BaseInfoContext.Provider>
    )
}

export default PageLayout