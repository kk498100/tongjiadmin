import styles from './index.module.scss'
import { useEffect, useState } from 'react'

const Online = props => {
    const {
        status: a = 1,
        fontSize: b = 12
    } = props

    const [statusText, setStatusTex] = useState('休息中')

    useEffect(() => {
        a === 1 ? setStatusTex('值班中') : setStatusTex('休息中')
    }, [a])

    return (
        <div className={ styles.online }>
            <div className={ `${ styles.onlineDot } ${ a === 1 ? 'on' : 'off' }` }></div>
            <div
                style={ { fontSize: `${ b }px` } }
                className={ `${ styles.onlineText } ${ a === 1 ? 'on' : 'off' }` }
            >
                { statusText }
            </div>
        </div>
    )
}

export default Online