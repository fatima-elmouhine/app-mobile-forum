import axiosInstance from '../config'

export const putTopic = async ( topicID, title, userID, themeID ) => {
  try {
      const courseResponse = await axiosInstance.put(`/topics/${topicID}`, {
        id: topicID,
        title: title,
        id_user: userID,
        id_theme: themeID
      })
      return courseResponse.data
  } catch (e) {
    // console.log('ERROR',e)
    return e.response.data
  }
}