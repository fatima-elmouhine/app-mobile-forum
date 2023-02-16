import axiosInstance from '../config'

export const getType = async (typeID) => {
   const { data } = await axiosInstance.get(`types/${typeID}`)
   return data
}