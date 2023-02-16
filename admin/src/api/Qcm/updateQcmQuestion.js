import axiosInstance from '../config'

 export const updateQcmQuestion = async ( id, text, id_theme ) => {
    const { data } = await axiosInstance.put(`questions`, {
        id: id,
        text: text,
        id_theme: id_theme,
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