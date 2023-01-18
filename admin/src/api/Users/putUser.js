import axiosInstance from '../config'

export const putUser = async (userInformations) => {


  try {
    return (await axiosInstance.put(`/users`,
      {
        ...userInformations,
      })).data
  } catch (e) {
    console.log('LE E',e)
    // switch (e) {
    //   case e.request:
    //     console.log(e.request)
    //     console.log(e.message)
    //     break
    //   case e.response:
    //     console.log(e.response)
    //     console.log(e.message)
    //     break
    //   default:
    //     console.log(e.config)
    // }
  }
}