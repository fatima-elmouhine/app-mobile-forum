import axiosInstance from '../config'

export const getCourses = async () => {
   const { data } = await axiosInstance.get(`courses?include=Theme`)
   return data
}