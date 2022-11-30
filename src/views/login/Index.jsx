/**
 * @description 登陆页面
 * @returns {JSX.Element}
 * @constructor
 */
import styles from './index.module.scss'
import LogoImg from '@/assets/imgs/logo.png'
import Banner from './Banner.jsx'
import LoginForm from './Form.jsx'

const Logo = () => {
    return (
        <div className={ styles.pageLoginLogo }>
            <img src={ LogoImg }
                 width={ 33 }
                 height={ 33 } />
            <div className={ styles.pageLoginLogoText }>同济放射科管理后台</div>
        </div>
    )
}

const PageLogin = () => {
    return (
        <div className={ styles.pageLogin }>
            <Logo />

            <Banner />

            <LoginForm />
        </div>
    )
}

export default PageLogin