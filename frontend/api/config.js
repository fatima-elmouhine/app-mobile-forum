import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import { API_IP } from '@env'

const axiosInstance = axios.create({
  baseURL: `http://${API_IP}:3000/api/`, responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

axiosInstance.interceptors.request.use(function (request) {

  const token = SecureStore.getItemAsync('token')
  request.headers.Authorization = `Bearer ${token}` // for Spring Boot back-end
  request.headers['Content-Type'] = 'application/json'
  return request

  return request
}, function (error) {
  console.log('config', error)
  return Promise.reject(error)
})
export default axiosInstance