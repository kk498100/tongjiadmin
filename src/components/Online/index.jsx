import styles from './index.module.scss'

const Online = props => {
    const {
        status: a = 1,
        fontSize: b = 12
    } = props

    const statusText = a === 1 ? '值班中' : '休息中'

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