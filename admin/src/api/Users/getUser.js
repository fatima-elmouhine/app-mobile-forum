import axiosInstance from '../config'

export const getUser = async (userID) => {

    try {
        return await (await axiosInstance.get(`/users/${userID}`)).data
    } catch (error) {
        switch (error.response.status) {
            case 404:
                console.log('User not found')
                break;
            default:
                console.log('Error')
        }
    }

    // const { data } = await axiosInstance.get(
    //     `/users/`,
    // )
    // return data
}                    