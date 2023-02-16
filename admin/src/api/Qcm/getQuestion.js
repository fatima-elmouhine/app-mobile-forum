import axiosInstance from '../config'

 export const getQuestion = async (questionID) => {
    const { data } = await axiosInstance.get(`questions/${questionID}?include=Answer`)

    try {
        if (data == 200) {
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