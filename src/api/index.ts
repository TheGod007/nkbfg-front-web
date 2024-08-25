/* eslint-disable no-unneeded-ternary */
/* eslint-disable prefer-template */
/* eslint-disable no-else-return */

import axios from 'axios'

const baseURL = import.meta.env.VITE_APP_BASE_URL
axios.defaults.baseURL = baseURL
axios.defaults.timeout = 30000
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token && !config.headers.Authorization) {
      // eslint-disable-next-line prefer-template
      config.headers.Authorization = 'Bearer ' + token
    }
    /* 接口发送请求拦截器逻辑 */
    return config
  },
  (error) => {
    return error
  }
)
axios.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
      case 200:
        return response.data.data
      case 400:
        ElMessage.error(response.data.message)
        return Promise.reject(new Error(response.data.message))
      default:
        localStorage.removeItem('token')
    }
  },
  (error) => {
    // 处理网络错误
    let msg = ''
    if (error.response?.status) {
      switch (error.response.status) {
        case 401:
          msg = 'token过期,请重新登陆'
          break
        case 403:
          msg = '登陆过期,请刷新后重新登陆'
          // 防止服务器重启，token失效，或token时间到期
          break
        case 404:
          msg = '请求地址错误'
          break
        case 500:
          msg = '服务器出现问题'
          break
        default:
          msg = '无网络'
      }
    }
    localStorage.removeItem('token')
    console.log(msg ? msg : '服务器出问题了，请联系站长')
    return Promise.reject(error)
  }
)
export default axios
