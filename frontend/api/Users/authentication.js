import axiosInstance from '../config'
import * as SecureStore from 'expo-secure-store'

export const userAuthentication = async ( email, password ) => {
    const response = await axiosInstance.post('users/login', {
        email,
        password
    })
    console.log('response', response);
    console.log('response.data', response.data);
    console.log('response.data.token', response.data.token);

    if (response.data.token) {
        await SecureStore.setItemAsync('token', response.data.token)
        console.log('response', response);
        console.log('response.data', response.data);
        console.log('response.data.token', response.data.token);
    } 
    
    return response.data
}