/**
 * @description 用户相关接口
 * @author li Zhengxiang
 */
import request from './request.js'

const prefix = '/userModule'

/**
 * @description 获取登陆用户基础信息api
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchBaseInfo = (data = {}) =>
    request.post(`${ prefix }/base`, data)

/**
 * @description 获取用户未读消息数api
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchNoReadNotify = (data = {}) =>
    request.post(`${ prefix }/noread`, data)