import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000,
  // withCredentials: true // send cookies when cross-domain requests
})

service.interceptors.request.use(
  (config) => {
    // Add X-Access-Token header to every request, you can add other custom headers here
    // if (UserModule.accessToken) {
    //   config.headers['X-Access-Token'] = UserModule.accessToken || ''
    // }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code !== 20000) {
      if (code === 50004) {
        // return UserModule.RefreshToken()
        //   .then(() =>
        //     // reload api
        //     service(response.config)
        //   )
        //   .catch(() => {
        //     UserModule.LogOut()
        //     location.reload() // To prevent bugs from vue-router
        //   })
      } else if (code === 50002) {
        // return MessageBox.confirm('你已被登出，请重新登录', '警告', {
        //   confirmButtonText: '确定',
        //   showCancelButton: false,
        //   type: 'warning',
        // }).then(() => {
        //   UserModule.LogOut()
        // })
      }
      // message &&
      //   Message({
      //     message: message,
      //     type: 'error',
      //     duration: 5 * 1000,
      //   })
      return Promise.reject(new Error(message || 'Error'))
    }
    return response.data
  },
  ({ message, response }) => {
    // Message({
    //   message: response?.data?.message || message,
    //   type: 'error',
    //   duration: 5 * 1000,
    // })
    return Promise.reject({ message: message || response?.data?.message })
  }
)

export default service
