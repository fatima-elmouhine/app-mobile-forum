import axiosInstance from '../config'

 export const getAvatar = async ( id ) => {
    const {data} = await axiosInstance.get(`users/avatar/${id}`)
    return data.avatar
 }