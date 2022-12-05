import { useEffect, useState } from 'react'
import { fetchNoReadNotify } from '@/api/user.js'
import { useUserStore } from '@/store/user.js'
import { useLocation } from 'react-router-dom'

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

export const useLayoutMenu = () => {
    const { pathname } = useLocation()

    const menuTab = [
        {
            title: '控制台',
            key: '1',
            icon: 'dashboard',
            path: '/dashboard',
            name: 'dashboard',
            children: [
                {
                    title: '工作台',
                    key: '1_1',
                    path: '/dashboard/workspace',
                    role: [1, 2]
                }
            ]
        },
        {
            title: '用户管理',
            key: '2',
            icon: 'wechat',
            path: '/user',
            name: 'user',
            children: [
                {
                    title: '后台用户',
                    key: '2_1',
                    path: '/user/manage',
                    role: [1]
                },
                {
                    title: '小程序用户',
                    key: '2_2',
                    path: '/user/miniprogram',
                    role: [1, 2]
                },
                {
                    title: '值班设置',
                    key: '2_3',
                    path: '/user/setting',
                    role: [1]
                }
            ]
        },
        {
            title: '问卷管理',
            key: '3',
            icon: 'book',
            path: '/question',
            name: 'question',
            children: [
                {
                    title: '问卷列表',
                    key: '3_1',
                    path: '/question/list',
                    role: [1, 2]
                },
                {
                    title: '统计数据',
                    key: '3_2',
                    path: '/question/data',
                    role: [1]
                }
            ]
        },
        {
            title: '资讯管理',
            key: '4',
            icon: 'file',
            path: '/info',
            name: 'info',
            children: [
                {
                    title: '公告中心',
                    key: '4_1',
                    path: '/info/notice',
                    role: [1, 2]
                },
                {
                    title: '资讯',
                    key: '4_2',
                    path: '/info/info',
                    role: [1, 2]
                },
                {
                    title: '百科知识',
                    key: '4_3',
                    path: '/info/wiki',
                    role: [1, 2]
                },
                {
                    title: '检查须知',
                    key: '4_4',
                    path: '/info/know',
                    role: [1, 2]
                }
            ]
        },
        {
            title: '消息中心',
            key: '5',
            icon: 'notification',
            path: '/notification',
            name: 'notification',
            children: [
                {
                    title: '我的消息',
                    key: '5_1',
                    path: '/notification/my',
                    role: [1, 2]
                }
            ]
        },
        {
            title: '关于我们',
            key: '6',
            icon: 'about',
            path: '/about',
            name: 'about',
            children: [
                {
                    title: '关于我们',
                    key: '6_1',
                    path: '/about',
                    role: [1, 2]
                }
            ]
        }
    ]
    const childList = []
    menuTab.map(e => {
        e.children?.length && e.children.map(i => childList.push(i))
    })
    const [defaultOpenKeys, setDefaultOpenKeys] = useState([menuTab.find(v => pathname.indexOf(v.name) !== -1)?.key])
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([childList.find(v => pathname === v.path)?.key])

    const [currentBreadcrumb, setCurrentBreadcrumb] = useState(null)

    useEffect(() => {
        const icon = menuTab.find(v => pathname.indexOf(v.name) !== -1)?.icon
        const title = menuTab.find(v => pathname.indexOf(v.name) !== -1)?.title
        const childTitle = childList.find(v => pathname === v.path)?.title
        setCurrentBreadcrumb({
            icon, title, childTitle
        })

        setDefaultOpenKeys([menuTab.find(v => pathname.indexOf(v.name) !== -1)?.key])
        setDefaultSelectedKeys([childList.find(v => pathname === v.path)?.key])
    }, [pathname])

    return {
        menuTab,
        defaultOpenKeys,
        defaultSelectedKeys,
        currentBreadcrumb
    }
}