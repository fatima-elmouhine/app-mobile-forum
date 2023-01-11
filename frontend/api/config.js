import axios from 'axios'
// import * as SecureStore from 'expo-secure-store';
import { API_IP } from '@env'

const axiosInstance = axios.create({
  baseURL: `http://${API_IP}:3000/api/`, responseType: 'json',
})

axiosInstance.interceptors.request.use(function (request) {
  if (localStorage.getItem('token')) {
    request.headers['Authorization'] = 'Bearer ' + localStorage.getItemAsync('token')
  }
  return request
}, function (error) {
  console.log('config', error)
  return Promise.reject(error)
})
export default axiosInstance