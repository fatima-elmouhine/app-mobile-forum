import axios from 'axios'
// import * as SecureStore from 'expo-secure-store';
// import {API_IP} from '@env'
import API_IP from '../env.js'
console.log(`http://${API_IP}:3000/api/`)

const axiosInstance = axios.create({
  baseURL: `http://10.10.30.205:3000/api/`, responseType: 'json',
})

axiosInstance.interceptors.request.use(function (request) {
  // console.log(request)
  SecureStore.getItemAsync('token').then((token) => {
    request.headers.Authorization = `Bearer ${token}`
  })
  return request
}, function (error) {
  console.log('config', error)
  return Promise.reject(error)
})

export default axiosInstance