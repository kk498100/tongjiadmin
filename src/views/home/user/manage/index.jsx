/**
 * @description 用户管理 后台用户 页面
 * @returns {JSX.Element}
 * @constructor
 */
import SearchForm from '@/components/SearchForm/index.jsx'
import DataTable from './dataTable.jsx'
import { useManage } from './useManage.js'
import { Button, Divider, Space } from '@arco-design/web-react'
import styles from './index.module.scss'
import { useEffect, useMemo } from 'react'

const PageUserManage = () => {
    const {
        searchFormSetting,
        resetForm,
        submit,
        form,
        flagInit,
        loading,
        dataList,
        total,
        pageIndex,
        pageChange
    } = useManage()

    return (
        <>
            <SearchForm
                formSetting={ searchFormSetting }
                form={ form }>
                <Space
                    size={ 6 }
                    className={ styles.searchFormAppend }>
                    <Button
                        type='primary'
                        onClick={ submit }>搜索</Button>
                    <Button onClick={ resetForm }>重置</Button>
                    <Button type='primary'>新增管理员</Button>
                </Space>
            </SearchForm>
            <Divider style={ { borderBottomStyle: 'dashed' } } />

            { useMemo(() => <DataTable
                flagInit={ flagInit }
                loading={ loading }
                dataList={ dataList }
                total={ total }
                pageChange={ pageChange }
                pageIndex={ pageIndex }
            />, [flagInit, loading, dataList, total, pageIndex]) }
        </>
    )
}

export default PageUserManage