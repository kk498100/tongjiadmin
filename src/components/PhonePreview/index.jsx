import styles from './index.module.scss'
import { Button, Drawer } from '@arco-design/web-react'
import { forwardRef, useImperativeHandle, useState } from 'react'

const PhonePreview = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const {
        children,
        title
    } = props

    useImperativeHandle(ref, () => ({
        setVisible
    }))

    return <Drawer
        width={ 380 }
        visible={ visible }
        title={ title }
        footer={ <Button
            type='primary'
            onClick={ () => setVisible(false) }>确定</Button> }
        onCancel={ () => setVisible(false) }>
        <div className={styles.phonePreviewContainer}>
            { children }
        </div>
    </Drawer>
})

export default PhonePreview