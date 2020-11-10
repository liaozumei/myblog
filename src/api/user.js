import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
 
  var params = new URLSearchParams();
  params.append('token',token)
  return request({
    url: '/users/info',
    method: 'POST',
    params
  })
}

export function logout() {
  return request({
    url: '/users/logout',
    method: 'post'
  })
}
