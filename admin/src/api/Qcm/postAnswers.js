import axiosInstance from '../config'

 export const postAnswers = async ( answersArray2, questionID ) => {
    const { data } = await axiosInstance.post(`answers`, {
        data: {
            text: answersArray2.text,
            isCorrect_answer: answersArray2.isCorrect_answer,
            Questions: questionID
        }
    })

    try {
        
        if (data.status == 201) {
            console.log(data);
            console.log(data.data);
            logIn(data.status);
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

    return data
}