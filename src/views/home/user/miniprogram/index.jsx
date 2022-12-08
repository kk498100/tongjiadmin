/**
 * @description 用户管理 小程序用户 页面
 * @returns {JSX.Element}
 * @constructor
 */
import styles from './index.module.scss'
import SearchForm from '@/components/SearchForm/index.jsx'
import DataTable from './dataTable.jsx'
import AnalysisDrawer from './analysisDrawer.jsx'
import { useEcharts, useMiniProgram } from '@/views/home/user/miniprogram/useMiniProgram.js'
import { Button, Divider, Space } from '@arco-design/web-react'
import { useMemo } from 'react'

const Echarts = () => {
    const {
        echartsRef
    } = useEcharts()
    return <div
        ref={ echartsRef }
        className={ styles.echartsContainer }></div>
}

const PageUserMiniprogram = () => {
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
    } = useMiniProgram()

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

            { useMemo(() => <AnalysisDrawer>
                <Echarts />
            </AnalysisDrawer>, []) }
        </>
    )
}

export default PageUserMiniprogram