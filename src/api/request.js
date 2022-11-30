import axios from 'axios'
import jsCookie from 'js-cookie'
import { Modal } from '@arco-design/web-react'

const instance = axios.create({
    baseURL: `${ import.meta.env.VITE_API_HOST }/${ import.meta.env.VITE_API_PREFIX }/pc`,
    timeout: 3000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'X-Request-Agent': 'Axios'
    }
})

instance.interceptors.request.use(request => {
    const token = jsCookie.get('_TOKEN_KEY_')
    if (!!token) {
        request.headers['token'] = token
    }
    return request
})

// 响应拦截器
instance.interceptors.response.use(
    async response => {
        const {
            data: {
                code,
                data = {},
                msg = ''
            }
        } = response

        // 接口不校验yapi code
        if (!response.request.responseURL.includes('yapi')) {
            if (code !== 200) {
                // 错误
                Modal.error({
                    title: '提示',
                    content: msg
                })
                return Promise.reject(msg)
            }
        }

        return Promise.resolve(data)
    },
    err => {
        console.log('网络请求错误：', err)
        return Promise.reject(err)
    }
)

export default instance