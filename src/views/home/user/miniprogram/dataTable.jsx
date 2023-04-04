import dayjs from 'dayjs'
import { Button, Empty, Table } from '@arco-design/web-react'
import styles from '@/views/home/user/manage/index.module.scss'
import { IconRobot } from '@arco-design/web-react/icon'
import { useMiniprogramStore } from '@/store/user.js'

const DataTable = props => {
    const {
        flagInit,
        loading,
        dataList,
        total,
        pageChange = null,
        pageIndex
    } = props

    const setUserInfo = useMiniprogramStore(state => state.setUserInfo)
    const setDrawerVisible = useMiniprogramStore(state => state.setDrawerVisible)

    const showUserDrawer = info => {
        setUserInfo(info)
        setDrawerVisible(true)
    }

    const columns = [
        {
            title: '姓名',
            dataIndex: 'name'
        },
        {
            title: '手机号',
            dataIndex: 'phone'
        },
        {
            title: '最后填写问卷日期',
            dataIndex: 'updateTime',
            render: (col, item, index) => {
                const {
                    createTime: a = Date.now()
                } = item
                return dayjs(a).format('YYYY-MM-DD HH:mm')
            }
        },
        {
            title: '问卷数量',
            dataIndex: 'questionNum',
            sorter: (a, b) => a.questionNum - b.questionNum,
            filters: [{
                text: '> 5',
                value: 5
            }, {
                text: '> 10',
                value: 10
            }, {
                text: '> 20',
                value: 20
            }, {
                text: '> 30',
                value: 30
            }],
            onFilter: (value, row) => row.questionNum > value
        },
        {
            title: '操作',
            dataIndex: 'handle',
            render: (col, item, index) => {
                const {
                    questionNum: a = 0
                } = item
                return a > 0
                    ? <Button
                        type='primary'
                        size='mini'
                        icon={ <IconRobot /> }
                        onClick={ () => showUserDrawer(item) }>
                        数据
                    </Button>
                    : <></>
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
                description='暂无小程序用户数据' /> }
        /> }
    </>
}

export default DataTable