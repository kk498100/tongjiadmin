import { useEffect, useState } from 'react'
import { fetchChangeStatus, fetchEditManage, fetchManageList } from '@/api/user.js'
import { Message } from '@arco-design/web-react'

export const useSetting = () => {
    const [dataSource, setDataSource] = useState([])
    const [flagComplete, setFlagComplete] = useState(false)
    const [online, setOnline] = useState([])
    const [moveLoading, setMoveLoading] = useState(false)

    const getUserList = async () => {
        try {
            const {
                list: a = []
            } = await fetchManageList()
            const dataSourceList = []
            a.map(v => dataSourceList.push({
                key: v.id,
                value: v.name
            }))
            setDataSource(dataSourceList)
            const list = a.filter(v => v.status === 1)
            const onlineList = []
            list.map(v => onlineList.push({
                key: v.id,
                value: v.name
            }))
            setOnline(onlineList)
        } catch (e) {
            console.log(e)
        } finally {
            setFlagComplete(true)
        }
    }

    useEffect(() => {
        getUserList()
    }, [])

    const moveHandle = async (newTargetKeys, direction, moveKeys) => {
        try {
            setMoveLoading(true)
            await fetchChangeStatus({
                ids: moveKeys,
                status: direction === 'target' ? 1 : 2
            })
            Message.success('设置成功！')
        } catch (e) {
            console.log(e)
        } finally {
            setMoveLoading(false)
        }
    }

    return {
        flagComplete,
        dataSource,
        online,
        moveHandle,
        moveLoading
    }
}