import styles from './index.module.scss'
import { Button, Form, Input, Space } from '@arco-design/web-react'
import { IconLock, IconUser } from '@arco-design/web-react/icon'
import { useLogin } from './hooks/useLogin.js'

const { Item } = Form

const LoginForm = () => {

    const {
        formRef,
        submitClick,
        loading
    } = useLogin()

    return (
        <div className={ styles.pageLoginLoginContent }>
            <div className={ styles.pageLoginLoginWrap }>
                <div className={ styles.pageLoginLoginTitle }>管理后台登陆</div>

                <Form
                    ref={ formRef }
                    layout='vertical'
                    className={ styles.pageLoginLoginForm }
                >
                    <Item
                        field='userName'
                        rules={ [{ required: true, message: '请输入账号' }] }
                    >
                        <Input
                            prefix={ <IconUser /> }
                            placeholder='请输入账号'
                            onPressEnter={ submitClick }
                            size='large'
                        />
                    </Item>

                    <Item
                        field='password'
                        rules={ [{ required: true, message: '请输入密码' }] }
                    >
                        <Input.Password
                            prefix={ <IconLock /> }
                            placeholder='请输入密码'
                            onPressEnter={ submitClick }
                            size='large'
                        />
                    </Item>

                    <Space
                        size={ 16 }
                        direction='vertical'
                    >
                        <Button
                            type='primary'
                            long
                            loading={ loading }
                            onClick={ submitClick }
                        >
                            登陆
                        </Button>
                    </Space>
                </Form>
            </div>
</div>
    )
}
export default LoginForm