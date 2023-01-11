import axiosInstance from '../config'

export const userAuthentication = async ( email, password ) => {
    try {
        const userAuth = await axiosInstance.post('users/login')
        .then(response => {
            console.log('controler', response)
            return response
        })
    } catch (error) {
        console.log('controler_catch', error)
    }
}