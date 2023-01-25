import axiosInstance from '../config'

export const getTopicMessage = async (topicID) => {
   const { data } = await axiosInstance.get(`topics/${topicID}?include=Message`)
   return data
}