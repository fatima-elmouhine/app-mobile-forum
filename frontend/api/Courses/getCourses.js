import axiosInstance from '../config'

 export const getCourses = async (queryString) => {
    const { data } = await axiosInstance.get(`courses?include=Theme${queryString ? `&${queryString}` : ''}`)
    return data
 }