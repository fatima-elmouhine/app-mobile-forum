import axiosInstance from '../config'

 export const getQcms = async (queryString) => {
    const { data } = await axiosInstance.get(`qcms?include=Question${queryString ? `&${queryString}` : ''}`)
    return data
 }