import axiosInstance from '../config'

export const getTopics = async () => {
   const { data } = await axiosInstance.get(`topics?include=Theme,User`)
   return data
}