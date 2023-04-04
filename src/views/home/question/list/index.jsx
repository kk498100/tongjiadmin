/**
 * @description 问卷列表 页面
 */
import SearchForm from '@/components/SearchForm/index.jsx'
import DataTable from './dataTable.jsx'
import { useMemo } from 'react'
import { useList } from '@/views/home/question/list/useList.js'
import { Button, Divider, Space } from '@arco-design/web-react'
import styles from '@/views/home/user/manage/index.module.scss'

const PageQuestionList = () => {
    const {
        searchFormSetting,
        resetForm,
        submit,
        form,
        flagInit,
        loading,
        dataList,
        total,
        pageChange,
        pageIndex,
        tableFresh
    } = useList()
    return (
        <>
            { useMemo(() => <SearchForm
                formSetting={ searchFormSetting }
                form={ form }>
                <Space
                    size={ 6 }
                    className={ styles.searchFormAppend }>
                    <Button
                        type='primary'
                        onClick={ submit }
                    >
                        搜索
                    </Button>
                    <Button onClick={ resetForm }>重置</Button>
                    <Button
                        type='primary'
                    >
                        新增问卷
                    </Button>
                </Space>
            </SearchForm>, []) }

            <Divider style={ { borderBottomStyle: 'dashed' } } />

            { useMemo(() => <DataTable
                flagInit={ flagInit }
                loading={ loading }
                dataList={ dataList }
                total={ total }
                pageChange={ pageChange }
                pageIndex={ pageIndex }
                tableFresh={ tableFresh }
            />, [flagInit, loading, dataList, total, pageIndex]) }
        </>
    )
}
export default PageQuestionList