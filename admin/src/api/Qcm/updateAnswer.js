import axiosInstance from '../config'

 export const updateAnswer = async ( id, text, isCorrect_answer ) => {
    const { data } = await axiosInstance.put(`answers`, {
        text: text,
        isCorrect_answer: isCorrect_answer,
        id: id
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