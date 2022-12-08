import { Button, Drawer } from '@arco-design/web-react'
import { useDrawer } from './useMiniProgram.js'
import styles from './index.module.scss'

const AnalysisDrawer = ({ children }) => {
    const {
        drawerVisible,
        closeDrawer
    } = useDrawer()

    return <Drawer
        width={ 480 }
        title='用户问卷分析'
        visible={ drawerVisible }
        maskClosable={ true }
        onCancel={ closeDrawer }
        footer={ <Button
            type='primary'
            onClick={ closeDrawer }>
                        确认
                </Button> }
    >
        { children ? children : <></> }
    </Drawer>
}

export default AnalysisDrawer