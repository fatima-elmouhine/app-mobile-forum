import axiosInstance from '../config'

export const putCourse = async ( courseID, title, link, id_theme ) => {
  try {
      const courseResponse = await axiosInstance.put(`/courses`, {
        courseID: courseID,
        title: title,
        link: link,
        id_theme: id_theme
      })
      return courseResponse.data
  } catch (e) {
    // console.log('ERROR',e)
    return e.response.data
  }
}