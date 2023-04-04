import { Button, Empty, Message, Modal, Space, Table } from '@arco-design/web-react'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { fetchChangeStatus } from '@/api/question.js'
import PhonePreview from '@/components/PhonePreview/index.jsx'

const DataPreview = props => {
    return <div className={styles.dataPreviewContent}>321312</div>
}

const DataModal = forwardRef((props, ref) => {
    const [useVisible, setUseVisible] = useState(false)
    const [discardVisible, setDiscardVisible] = useState(false)

    const [useLoading, setUseLoading] = useState(false)
    const [discardLoading, setDiscardLoading] = useState(false)

    useImperativeHandle(ref, () => ({
        setUseVisible,
        setDiscardVisible
    }))

    const {
        itemData,
        tableFresh
    } = props

    const useConfirm = async () => {
        try {
            if (useLoading) return
            const {
                id: a = null,
                title: b = null
            } = itemData
            setUseLoading(true)
            await fetchChangeStatus({
                id: a,
                status: 2
            })
            Message.success(`问卷"${ b }"启用成功!`)
            setUseVisible(false)
            tableFresh()
        } catch (e) {
            console.log(e)
        } finally {
            setUseLoading(false)
        }
    }

    const discardConfirm = async () => {
        try {
            if (discardLoading) return
            const {
                id: a = null,
                title: b = null
            } = itemData
            setDiscardLoading(true)
            await fetchChangeStatus({
                id: a,
                status: 3
            })
            Message.success(`问卷"${ b }"废弃成功!`)
            setDiscardVisible(false)
            tableFresh()
        } catch (e) {
            console.log(e)
        } finally {
            setDiscardLoading(false)
        }
    }


    return <>
        <Modal
            title='启用问卷'
            visible={ useVisible }
            onCancel={ () => setUseVisible(false) }
            okButtonProps={ {
                loading: useLoading
            } }
            onConfirm={ useConfirm }
        >
            <div>启用问卷之后用户将可以填报该问卷，<span style={ { color: '#F53F3F' } }>你还要继续吗？</span></div>
        </Modal>

        <Modal
            title='问卷废弃'
            visible={ discardVisible }
            onCancel={ () => setDiscardVisible(false) }
            okButtonProps={ {
                loading: discardLoading
            } }
            onConfirm={ discardConfirm }
        >
            <div>废弃之后用户将不能填报该问卷，<span style={ { color: '#F53F3F' } }>你还要继续吗？</span></div>
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

    const modalRef = useRef(null)
    const [itemData, setItemData] = useState(null)

    const useClick = async item => {
        const {
            setUseVisible
        } = modalRef.current
        setItemData(item)
        setUseVisible(true)
    }

    const discardClick = item => {
        const {
            setDiscardVisible
        } = modalRef.current
        setItemData(item)
        setDiscardVisible(true)
    }

    const previewRef = useRef(null)
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewId, setPreviewId] = useState(null)

    const showPreviewDrawer = item => {
        const {
            setVisible
        } = previewRef.current
        const {
            title,
            id
        } = item
        setVisible(true)
        setPreviewTitle(`${ title }问卷预览`)
        setPreviewId(id)
    }

    const columns = [
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '创建人',
            dataIndex: 'createName'
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            render: (col, item, index) => {
                const {
                    createTime: a = Date.now()
                } = item
                return dayjs(a).format('YYYY-MM-DD HH:mm')
            }
        },
        {
            title: '填报人数',
            dataIndex: 'useNum',
            sorter: (a, b) => a.useNum - b.useNum,
            filters: [{
                text: '> 10',
                value: 10
            }, {
                text: '> 50',
                value: 50
            }, {
                text: '> 100',
                value: 100
            }, {
                text: '> 1000',
                value: 1000
            }],
            onFilter: (value, row) => row.useNum > value
        },
        {
            title: '是否重要',
            dataIndex: 'type',
            render: (col, item, index) => {
                const {
                    type: a = 0
                } = item
                return a
                    ? <span className={ styles.dataTableImportant }>重要</span>
                    : <span className={ styles.dataTableNoImportant }>不重要</span>
            }
        },
        {
            title: '是否需要传图',
            dataIndex: 'needImg',
            render: (col, item, index) => {
                const {
                    needImg: a = false
                } = item
                return a
                    ? '需要'
                    : '不需要'
            }
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (col, item, index) => {
                const {
                    status: a = 1
                } = item
                switch (a) {
                    case 1:
                        return <span className={ styles.dataTableNoUse }>未启用</span>
                    case 2:
                        return <span className={ styles.dataTableUse }>启用中</span>
                    case 3:
                        return <span className={ styles.dataTableDiscard }>已失效</span>
                    default:
                        return '未知状态'
                }
            }
        },
        {
            title: '操作',
            dataIndex: 'handle',
            fixed: 'right',
            render: (col, item, index) => {
                const {
                    status: a = 1
                } = item

                return <Space size={ 4 }>
                    {
                        a === 1 && <Button
                            type='primary'
                            size='mini'
                            onClick={ () => useClick(item) }>启用</Button>
                    }
                    {
                        a === 2 && <Button
                            type='primary'
                            size='mini'
                            onClick={ () => discardClick(item) }>废弃</Button>
                    }
                    {
                        a !== 3 && <Button
                            type='primary'
                            size='mini'>编辑</Button>
                    }
                    <Button
                        type='primary'
                        size='mini'
                        onClick={ () => showPreviewDrawer(item) }>
                        预览
                    </Button>
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
                description='暂无问卷数据' /> }
        /> }

        <DataModal ref={ modalRef } { ...{ itemData, tableFresh } } />

        <PhonePreview
            ref={ previewRef }
            title={ previewTitle }>
            <DataPreview id={ previewId } />
        </PhonePreview>
    </>
}

export default DataTable