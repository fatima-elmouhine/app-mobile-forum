import axiosInstance from '../config'

 export const getTopic = async (topicID) => {
    const { data } = await axiosInstance.get(`topics/${topicID}/messages`)
    return data
 }