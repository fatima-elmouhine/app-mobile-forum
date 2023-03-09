import axiosInstance from '../config'

 export const getTopics = async () => {
   try {
      const { data } = await axiosInstance.get(`topics?include=Message,Theme`)
      console.log(data, 'data')
      return data      
   } catch (error) {
      console.log(error, 'error')
   }
 }