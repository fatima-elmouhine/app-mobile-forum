import axiosInstance from '../config'

 export const postMessageTopic = async ( text, topicID ) => {
    const { data } = await axiosInstance.post(`messages`, {
        data : {
            text: text,
            id_topic: topicID
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