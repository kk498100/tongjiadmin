import style from './index.module.scss'
import { Result } from '@arco-design/web-react'

const NotFound = () => {
    return (
        <div className={ style.pageNotFound }>
            <Result
                status='404'
                subTitle='Whoops, that page is gone.' />
        </div>
    )
}

export default NotFound