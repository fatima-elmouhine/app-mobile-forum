import axiosInstance from '../config'

 export const getUserResult = async ( id ) => {
    const { data } = await axiosInstance.get(`results/user`)
    return data
 }