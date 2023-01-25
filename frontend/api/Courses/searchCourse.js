import axiosInstance from '../config'

 export const searchCourse= async (query) => {
    try {
      const { data } = await axiosInstance.get(`search/courses?${query}`)
      return data
    }
    catch (e) {
        // console.log('LE E',e)
        // return e.status
    //     switch (e) {
    //   case e.request:
    //     console.log('REQUEST',e.request)
    //     console.log('REQUEST',e.message)
    //     break
    //   case e.response:
    //     console.log('RESPONSE',e.response)
    //     console.log('RESPONSE',e.message)
    //     break
    //   default:
    //     console.log('CONFIG',e.config)
    // }
    }
    // const { data } = await axiosInstance.get(`search/forum?search=${query}`)
    // return data
 }