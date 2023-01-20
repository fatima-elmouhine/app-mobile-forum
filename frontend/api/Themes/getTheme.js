import axiosInstance from '../config'

 export const getTheme = async ( id ) => {
    const { data } = await axiosInstance.get(`themes/${id}?include=Topic`)
    return data
 }