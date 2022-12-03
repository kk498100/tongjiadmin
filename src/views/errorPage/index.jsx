/**
 * @description 错误页面
 */
import styles from './index.module.scss'
import { Result } from '@arco-design/web-react'

const ErrorPage = ({ errorMsg: a = 'Something went wrong. Please try again.' }) => {
    return (
        <div className={ styles.pageError }>
            <Result
                status='error'
                title='Error message'
                subTitle={ a }
            />
        </div>
    )
}

export default ErrorPage