import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://10.10.27.79:3000/api/', responseType: 'json',
})
// console.log(axiosInstance)

axiosInstance.interceptors.request.use(function (request) {
  // console.log(request)
  // console.log(request)
//   if (localStorage.getItem('authenticationToken')) {
//     request.headers['Authorization'] = `Bearer ${localStorage.getItem('authenticationToken')}`
//   }


  return request
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})
export default axiosInstance