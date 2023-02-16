import axiosInstance from '../config'

 export const getThemeQcms = async ( id ) => {
    const { data } = await axiosInstance.get(`themes/getQcms/${id}`)
    return data
 }