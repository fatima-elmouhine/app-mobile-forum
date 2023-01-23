import axiosInstance from '../config'

 export const postTopic = async ( title, userID, themeID ) => {
    const { data } = await axiosInstance.post(`topics`, {
        title: title,
        id_user: userID,
        id_theme: themeID
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