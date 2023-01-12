import axiosInstance from '../config'

 export const getTheme = async () => {
    const { data } = await axiosInstance.get(`themes`)
    return data
 }