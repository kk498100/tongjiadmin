import styles from './index.module.scss'
import TestImg from './imgs/6c85f43aed61e320ebec194e6a78d6d3.png_tplv-uwbnlip3yd-png.png'

const Banner = () => {
    return <div className={ styles.pageLoginBanner }>
        <img src={ TestImg }
             width={ 320 }
             height={ 240 } />
    </div>
}

export default Banner