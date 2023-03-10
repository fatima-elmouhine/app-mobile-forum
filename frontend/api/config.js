import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import API_IP from '../env.js'

const axiosInstance = axios.create({
  baseURL: `${API_IP}/api/`, responseType: 'json',
})

axiosInstance.interceptors.request.use(function (request) {
  SecureStore.getItemAsync('token').then((token) => {
    request.headers.Authorization = `Bearer ${token}`
  })
  return request
}, function (error) {
  console.log(error);
  return Promise.reject(error)
})

export default axiosInstance