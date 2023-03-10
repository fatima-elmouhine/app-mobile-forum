import axiosInstance from '../config'
import * as SecureStore from 'expo-secure-store'

export const putUser = async (userInformations) => {
  console.log('USER INFORMATIONS',userInformations)
  return
  try {
     
      const userResponse = await axiosInstance.put(`/users`,
      {
        ...userInformations,
      })
      SecureStore.setItemAsync('token', userResponse.data.token)

      return userResponse.data.user
      
  } catch (e) {
    // console.log('ERROR',e)
    return e.response.data
    // console.log('LE E',e)

    // switch (e) {
    //   case e.request:
        // console.log('REQUEST',e.request)
        // console.log('MESSAGE',e.message)
    //     break
    //   case e.response:
        // console.log('RESPONSE',e.response.data)
    //     console.log(e.message)
    //     break
    //   default:
    //     console.log(e.config)
    // }
  }
}