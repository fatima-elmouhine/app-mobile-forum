import axiosInstance from '../config'

export const putUser = async ( userInformations ) => {
  try {
      const userResponse = await axiosInstance.put(`/users`, {
        ...userInformations,
      })
      return userResponse.data.user
  } catch (e) {
    // console.log('ERROR',e)
    return e.response.data
  }
}