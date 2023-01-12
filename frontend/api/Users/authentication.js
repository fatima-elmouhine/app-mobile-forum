import axiosInstance from '../config'
import * as SecureStore from 'expo-secure-store'

export const userAuthentication = async ( email, password ) => {
  if (SecureStore.getItemAsync('token')) {
    SecureStore.deleteItemAsync('token')
  }

  const response = await axiosInstance.post('users/login', {
      email,
      password
  })

  try {
      if (response.status === 200) {
        SecureStore.setItemAsync('token', response.data.token)
        return response.data.token
      } 
  } catch (e) {
    switch (e) {
    case e.request:
      console.log(e.request)
      console.log(e.message)
      break
    case e.response:
      console.log(e.response)
      console.log(e.message)
      break
    default:
      console.log(e.config)
    }
  }
    
    return response.data && response.data.token
}