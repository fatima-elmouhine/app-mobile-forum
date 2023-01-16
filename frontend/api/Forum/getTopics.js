import axiosInstance from '../config'

 export const getTopics = async () => {
    const { data } = await axiosInstance.get(`topics?include=Message,Theme`)
    return data
 }