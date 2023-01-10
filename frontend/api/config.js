import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000/api/', responseType: 'json',
})

axiosInstance.interceptors.request.use(function (request) {
//   if (localStorage.getItem('authenticationToken')) {
//     request.headers['Authorization'] = `Bearer ${localStorage.getItem('authenticationToken')}`
//   }


  return request
}, function (error) {
  console.log(error)
  return Promise.reject(error)
})
export default axiosInstance