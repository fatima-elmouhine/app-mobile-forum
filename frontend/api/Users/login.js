import axiosInstance from '../config'

export const userAuthentication = async () => {
    try {
        const userAuthentication = await axiosInstance.post('users/login', { email, password })
        console.log(userAuthentication)
        return userAuthentication
    } catch (error) {
        console.log(error)
    }
}