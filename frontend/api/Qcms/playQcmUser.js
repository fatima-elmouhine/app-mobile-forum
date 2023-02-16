import axiosInstance from '../config'

export const playQcmUser = async (qcmId, answersUser, textInputValue, errorsArray) => {


try {
    
  const resultSend = await axiosInstance.post('/qcms/playingGame', {
            id_qcm : qcmId,
            text_structure : textInputValue,
            text_response : answersUser,
            errorArray : errorsArray,
    })
    console.log(resultSend.data)
return resultSend.data
        
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
        console.log(e)
        console.log(e.config)
    }
  }
}