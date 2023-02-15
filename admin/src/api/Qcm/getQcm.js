import axiosInstance from '../config'

 export const getQcm = async (qcmID) => {
    const { data } = await axiosInstance.get(`qcms/${qcmID}?include=Type`)

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