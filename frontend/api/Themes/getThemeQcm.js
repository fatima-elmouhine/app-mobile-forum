import axiosInstance from '../config'

 export const getThemeQcms = async ( id ) => {
    console.log(id);
    return
    const { data } = await axiosInstance.get(`themes/getQcms/${id}`)
    return data
 }