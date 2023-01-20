import axiosInstance from '../config'

export const postTopic = async (themeID, title) => {
try {
    
  const topicReq= await axiosInstance.post('topics', {
        data: {
            id_theme: themeID,
            title: title,
        }

    })
return topicReq
        
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
}