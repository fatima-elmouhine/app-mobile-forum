import axiosInstance from '../config'

 export const postQcm = async ( title, isGenerated, id_type ) => {
    const { data } = await axiosInstance.post(`qcms`, {
        title: title,
        isGenerated: isGenerated,
        id_type: id_type
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