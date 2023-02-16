import axiosInstance from '../config'

export const getTypes = async () => {
   const { data } = await axiosInstance.get(`types`)
   return data
}