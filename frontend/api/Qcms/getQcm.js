import axiosInstance from '../config'

 export const getQcm = async ( id ) => {
    const { data } = await axiosInstance.get(`qcms/${id}`)
    return data
 }