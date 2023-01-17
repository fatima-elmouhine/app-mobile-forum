import axios from 'axios'
import API_IP from './env.js'

const axiosInstance = axios.create({
  baseURL: `http://${API_IP}:3000/api/`, responseType: 'json',
})

// axiosInstance.interceptors.request.use(function (request) {
//   window.localStorage.getItem('token').then((token) => {
//     request.headers.Authorization = `Bearer ${token}`
//   })
//   return request
// }, function (error) {
//   console.log('config', error)
//   return Promise.reject(error)
// })

export default axiosInstance