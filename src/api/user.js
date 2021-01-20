import service from '@/utils/service'

export const login = (data) =>
  service({
    url: '/users/login',
    method: 'post',
    data,
  })

export const getUserInfo = () => service({ url: '/users/userInfo', method: 'get' })
export const refreshToken = (data) => service({ url: '/users/refreshToken', method: 'post', data })
export const updateUserRole = (data) => service({ url: 'users/updateUserRole', method: 'post', data })
