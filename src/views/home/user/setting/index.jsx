/**
 * @description 用户管理 值班设置 界面
 * @returns {JSX.Element}
 * @constructor
 */
import styles from './index.module.scss'
import { Divider, Spin, Transfer } from '@arco-design/web-react'
import { useMemo } from 'react'
import { useSetting } from '@/views/home/user/setting/useSetting.js'

const UserTransfer = () => {
    const {
        flagComplete,
        online,
        dataSource,
        moveHandle,
        moveLoading
    } = useSetting()

    return (
        <Spin
            dot
            tip='设置中...'
            loading={ moveLoading }
            style={ { width: '100%' } }
        >
            {
                flagComplete && <Transfer
                    showSearch
                    searchPlaceholder='输入管理员姓名'
                    dataSource={ dataSource }
                    defaultTargetKeys={ online }
                    titleTexts={ ['休息中', '值班中'] }
                    operationTexts={ ['值班', '休息'] }
                    onChange={ moveHandle }
                    listStyle={ {
                        width: '50%',
                        minHeight: '300px'
                    } }
                />
            }
        </Spin>
    )
}

const PageUserSetting = () => {
    return (
        <>
            { useMemo(() => <div className={ styles.pageSettingNote }>
                设置管理员值班设置，值班中的管理员将接收到用户问卷信息
            </div>, []) }
            <Divider style={ { borderBottomStyle: 'dashed' } } />
            { useMemo(() => <UserTransfer />, []) }
        </>
    )
}

export default PageUserSetting