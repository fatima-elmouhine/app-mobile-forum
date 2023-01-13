import axiosInstance from '../config'

 export const getUser = async ( id ) => {
    const { data } = await axiosInstance.get(`users/${id}`)
    return data
 }