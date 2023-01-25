import axios from 'axios'
import API_IP from './env.js'

const axiosInstance = axios.create({
  baseURL: `http://${API_IP}:3000/api/`, responseType: 'json',
})

axiosInstance.interceptors.request.use(function(request){
  const token = window.localStorage.getItem('token')
  if(token){
    request.headers.cookies= `token=${token}`}
  return request

})
export default axiosInstance