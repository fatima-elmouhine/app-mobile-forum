import axiosInstance from '../config'

export const getTheme = async () => {
    try {
        const Data = await axiosInstance.get(`themes?include=Topic&limitInclude=3`)
        return Data.data 
    } catch (error) {
        console.log('error')
        console.log(error)
    }

    // const { data } = await axiosInstance.get(
    //     `/users/`,
    // )
    // return data
}                   
