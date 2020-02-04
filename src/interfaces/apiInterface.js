import $config from 'config'
import axios from 'axios'
import $log from 'logger'
import Swal from 'sweetalert2'
import { router } from '../router.js'

const api = axios.create({
    baseURL: $config.api.baseUrl,
});

api.interceptors.request.use(
    config => {
        $log.info('api.interceptors.request')

        config.headers.Authorization = sessionStorage.getItem('token')

        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    $log.debug(error.response)
    if (401 === error.response.status) {
        Swal.fire({
            title: "Session Expired",
            text: "Your session has expired. Would you like to be redirected to the login page?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes"
        }).then((result) => {
            if(result.value) {
                router.push('/login')
            }
        })
    }
    else if(403 === error.response.status){
        Swal.fire({
            title: "Unauthorized",
            text: " This account isn't authorized to access the backoffice",
            icon: "error",
        })
    }
     else {
        return Promise.reject(error);
    }
});
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
