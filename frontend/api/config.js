import axios from 'axios'
// import * as SecureStore from 'expo-secure-store';
// import {API_IP} from '@env'
import API_IP from '../env.js'
console.log(`http://${API_IP}:3000/api/`)

const axiosInstance = axios.create({
  baseURL: `http://${API_IP}:3000/api/`, responseType: 'json',

})

axiosInstance.interceptors.request.use(function (request) {

  // if (SecureStore.getItem('authenticationToken')) {
  //   request.headers['Authorization'] = `Bearer ${SecureStore.getItem('authenticationToken')}`
  // }
  return request
}, function (error) {
  console.log('config', error)
  return Promise.reject(error)
})
export default axiosInstance