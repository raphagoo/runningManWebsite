import $config from 'config'
import axios from 'axios'
import $log from 'logger'

const api = axios.create({
    baseURL: $config.api.baseUrl,
});

api.interceptors.request.use(
    config => {
        $log.info('api.interceptors.request')

        config.headers.Authorization = sessionStorage.getItem('token')

        return config
    },
    (error) => Promise.reject(error)
)
// you may want to add interceptors to instance
// api.interceptors.request.use(
//     (config) => {
//         if (typeof config === 'undefined') {
//             config = {};
//         }
//         if (typeof config.headers === 'undefined') {
//             config.headers = {};
//         }
//         config.headers['My-Header'] = 'value';

//         return config
//     },
//     (error) => Promise.reject(error)
// )

export default api
