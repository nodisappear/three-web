import axios from 'axios'

//基本配置
axios.create({
    timeout: 0,
    withCredentials: true,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    maxContentLength: 2000,
    transformResponse: [
        function (data) {
            try {
                data = JSON.parse(data)
            } catch (e) {
                data = {}
            }
            return data
        }
    ]
})

//请求拦截器
axios.interceptors.request.use(config => {
    return Promise.resolve(config)
}, function (error) {
    return Promise.reject(error)
})

//响应拦截器
axios.interceptors.response.use(response => {
    return response.data
}, (error) => {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {


    } else if (error.response && error.response.data && error.response.data.message) {
        if (!(error.config && error.config.ignoreErrorCodes && error.config.ignoreErrorCodes.indexOf(error.response.data.code) !== -1)) {

        }
    }
    return Promise.reject(error)
})

export default axios



