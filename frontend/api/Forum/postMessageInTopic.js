import axiosInstance from '../config'

export const postMessageInTopic = async (topicID, textMessage) => {
  
try {
    
  const messageSend = await axiosInstance.post('/messages', {
        data: {
            id_topic: topicID,
            text: textMessage,
        }

    })
    // console.log('message : ',messageSend.data)
return messageSend
        
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