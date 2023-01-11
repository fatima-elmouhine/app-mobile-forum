import axios from 'axios'
// import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create({
  baseURL: 'http://10.10.27.154:3000/api/', responseType: 'json',
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