import axiosInstance from '../config'

export const playQcmUser = async (scoreEnd, qcmId, answersUser, textInputValue, errorsArray) => {

console.log('scoreEnd',scoreEnd)
console.log('qcmId',qcmId)
// console.log('answersUser',answersUser)
// console.log('textInputValue',textInputValue)
console.log('errorsArray',errorsArray)

return

try {
    
  const resultSend = await axiosInstance.post('qcms/playingGame', {
        data: {
    
            id_qcm : qcmId,
            text_structure : textInputValue,
            text_response : answersUser,
            errorArray : errorsArray,
            
        }

    })
    console.log(resultSend.data)
return resultSend
        
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