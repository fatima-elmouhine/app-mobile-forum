import axiosInstance from '../config'

 export const getThemes = async () => {
    const { data } = await axiosInstance.get(`themes?order=title:ASC`)
    return data
 }