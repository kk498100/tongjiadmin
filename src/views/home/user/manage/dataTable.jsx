import { Button, Empty, Message, Modal, Space, Table } from '@arco-design/web-react'
import styles from './index.module.scss'
import Online from '@/components/Online/index.jsx'
import dayjs from 'dayjs'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { fetchChangeStatus } from '@/api/user.js'
import { useManageStore } from '@/store/user.js'

const DataModal = forwardRef((props, ref) => {
    const [offVisible, setOffVisible] = useState(false)
    const [onlineVisible, setOnlineVisible] = useState(false)

    const [offLoading, setOffLoading] = useState(false)
    const [onlineLoading, setOnlineLoading] = useState(false)

    useImperativeHandle(ref, () => ({
        setOffVisible,
        setOnlineVisible
    }))

    const {
        itemData,
        tableFresh
    } = props

    const offConfirmClick = async () => {
        try {
            if (offLoading) return
            const {
                id: a = null,
                nick: b = null
            } = itemData
            setOffLoading(true)
            const params = {
                ids: a instanceof Array ? a : [a],
                status: 2
            }
            await fetchChangeStatus(params)
            tableFresh()
            Message.success(`${ b }状态已设置为休息中!`)
            setOffVisible(false)
        } catch (e) {
            console.log(e)
        } finally {
            setOffLoading(false)
        }
    }

    const onlineConfirmClick = async () => {
        try {
            if (offLoading) return
            const {
                id: a = null,
                nick: b = null
            } = itemData
            setOnlineLoading(true)
            const params = {
                ids: a instanceof Array ? a : [a],
                status: 1
            }
            await fetchChangeStatus(params)
            tableFresh()
            Message.success(`${ b }状态已设置为值班中!`)
            setOnlineVisible(false)
        } catch (e) {
            console.log(e)
        } finally {
            setOnlineLoading(false)
        }
    }

    return <>
        <Modal
            title='休息设置'
            visible={ offVisible }
            onCancel={ () => setOffVisible(false) }
            okButtonProps={ {
                loading: offLoading
            } }
            onConfirm={ offConfirmClick }
        >
            <div>设置之后该管理员将不会收到用户问卷信息，<span style={ { color: '#F53F3F' } }>你还要继续吗？</span></div>
        </Modal>

        <Modal
            title='值班设置'
            visible={ onlineVisible }
            onCancel={ () => setOnlineVisible(false) }
            okButtonProps={ {
                loading: onlineLoading
            } }
            onConfirm={ onlineConfirmClick }
        >
            <div>设置之后该管理员将接收用户问卷信息，<span style={ { color: '#F53F3F' } }>你还要继续吗？</span></div>
        </Modal>
    </>
})

const DataTable = props => {
    const {
        flagInit,
        loading,
        dataList,
        total,
        pageChange = null,
        pageIndex,
        tableFresh
    } = props

    const setEditType = useManageStore(state => state.setEditType)
    const setEditInfo = useManageStore(state => state.setEditInfo)

    const modalRef = useRef(null)
    const [itemData, setItemData] = useState(null)

    const offClick = item => {
        const {
            setOffVisible
        } = modalRef.current
        setItemData(item)
        setOffVisible(true)
    }

    const onlineClick = item => {
        const {
            setOnlineVisible
        } = modalRef.current
        setItemData(item)
        setOnlineVisible(true)
    }

    const editClick = info => {
        setEditInfo(info)
        setEditType('edit')
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '昵称',
            dataIndex: 'nick'
        },
        {
            title: '手机号',
            dataIndex: 'phone'
        },
        {
            title: '创建日期',
            dataIndex: 'createTime',
            render: (col, item, index) => {
                const {
                    createTime: a = Date.now()
                } = item
                return dayjs(a).format('YYYY-MM-DD HH:mm')
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (col, item, index) => {
                const {
                    status: a = 0
                } = item
                switch (a) {
                    case 1:
                    case 2:
                        return <Online status={ a } />
                    default:
                        return '未知'
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'handle',
            fixed: 'right',
            render: (col, item, index) => {
                const {
                    status: a = 0
                } = item
                return <Space size={ 4 }>
                    { a === 1
                        ? <Button type='primary'
                                  size='mini'
                                  onClick={() => offClick(item) }>休息</Button>
                        : <Button type='primary'
                                  size='mini'
                                  onClick={() => onlineClick(item) }>值班</Button>
                    }
                    <Button type='primary'
                            size='mini'
                            onClick={ () => editClick(item) }>编辑</Button>
                </Space>
            }
        }
    ]

    return <>
        { flagInit && <Table
            columns={ columns }
            border
            borderCell
            hover
            pagination={ { pageSize: 10, total, current: pageIndex } }
            data={ dataList }
            rowKey={ 'id' }
            className={ styles.dataTable }
            stripe
            onChange={ pageChange }
            loading={ loading }
            noDataElement={ <Empty
                imgSrc='//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a0082b7754fbdb2d98a5c18d0b0edd25.png~tplv-uwbnlip3yd-webp.webp'
                description='暂无管理员数据' /> }
        /> }

        <DataModal ref={ modalRef } { ...{ itemData, tableFresh } } />
    </>
}

export default DataTable