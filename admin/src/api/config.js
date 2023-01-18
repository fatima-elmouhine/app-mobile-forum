import axios from 'axios'
import API_IP from './env.js'

const axiosInstance = axios.create({
  baseURL: `http://${API_IP}:3000/api/`, responseType: 'json',
})

export default axiosInstance