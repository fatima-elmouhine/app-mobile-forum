import axiosInstance from '../config'

export const getTopics = async () => {
   const { data } = await axiosInstance.get(`topics`)
   return data
}