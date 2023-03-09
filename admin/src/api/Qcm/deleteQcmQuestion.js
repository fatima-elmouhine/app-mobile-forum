import axiosInstance from '../config'

export const deleteQcmQuestion = async (qcmQuestionID, qcmID) => {

    const { data } = await axiosInstance.delete(`qcmQuestions`, {
        data: {
            QuestionId: qcmQuestionID,
            QcmId: qcmID
        }})
    try {
        if (data.status == 200) {
            console.log(data);
            console.log(data.data);
            return data
        } 
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