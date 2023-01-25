import axiosInstance from '../config'

export const putTopic = async ( topicID, title, userID, themeID ) => {
  try {
      const courseResponse = await axiosInstance.put(`/topics`, {
        title: title,
        topicID: topicID,
        id_user: userID,
        id_theme: themeID
      })
      console.log('courseResponse', courseResponse.data);
      return courseResponse.data
  } catch (e) {
    // console.log('ERROR',e)
    return e.response.data
  }
}