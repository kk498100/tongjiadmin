/**
 * @description 登陆相关api
 * @author li zhengxiang
 */
import request from './request.js'

/**
 * @description 用户登陆api
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchLogin = (data = {}) =>
    request.post('/userModule/login', data)