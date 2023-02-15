import axiosInstance from '../config'

 export const getQcmUser = async (id) => {
    const { data } = await axiosInstance.get(`qcms/correction/${id}`)
    return data[0]
 }