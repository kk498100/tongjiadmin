/**
 * @description 问卷列表 api
 * @author li Zhengxiang
 */
import request from './request.js'

const prefix = '/questionModule'

/**
 * @description 获取问卷列表 api
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchQuestionList = (data = {}) =>
    request.post(`${ prefix }/list`, data)

/**
 * @description 变更问卷状态 api
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchChangeStatus = (data = {}) =>
    request.post(`${ prefix }/changeStatus`, data)