import axiosInstance from '../config'

export const putTheme = async ( themeID, title, description ) => {
  try {
      const courseResponse = await axiosInstance.put(`/themes`, {
        id: themeID,
        title: title,
        description: description,
      })
      return courseResponse.data
  } catch (e) {
    // console.log('ERROR',e)
    return e.response.data
  }
}