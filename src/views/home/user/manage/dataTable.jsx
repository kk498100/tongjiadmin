import { Button, Empty, Space, Table } from '@arco-design/web-react'
import styles from './index.module.scss'
import Online from '@/components/Online/index.jsx'

const DataTable = props => {
    const {
        flagInit,
        loading,
        dataList,
        total,
        pageChange = null,
        pageIndex
    } = props

    const columns = [
        {
            title: '昵称',
            dataIndex: 'nick'
        },
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '手机号',
            dataIndex: 'phone'
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
                                  size='mini'>休息</Button>
                        : <Button type='primary'
                                  size='mini'>值班</Button>
                    }
                    <Button type='primary'
                            size='mini'>编辑</Button>
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
    </>
}

export default DataTable