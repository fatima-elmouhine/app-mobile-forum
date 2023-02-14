import { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';
import axiosInstance from  '../api/config';
import { userAuthentication } from '../api/Users/authentication';
import { set } from 'date-fns';
import { getAvatar } from '../api/Users/getAvatar';

export const UserContext = createContext();




const UserContextProvider = (props) =>  {

    const [token, setToken] = useState(null);
    const [isLogged, setIsLogged] = useState(false);



    const decodedToken = token ? jwtDecode(token) : null;
    
        const [userDetails, setUserDetails] = useState({
            id: "",
            email: "",
            firstName: "",
            lastName: "",
            avatar: "",
        });

        SecureStore.getItemAsync('token').then((jwt) => {
          if (jwt === null) {
            return;
          }
          setIsLogged(true);
          setToken(jwt);
      });
  
        useEffect(() => {
          SecureStore.getItemAsync('token')
          const userDetail = async () => {
            const avatar = await getAvatar(decodedToken.id)
            setUserDetails({
              id: decodedToken.id,
              email: decodedToken.email,
              firstName: decodedToken.firstName,
              lastName: decodedToken.lastName,
              avatar: avatar,
            });
          }
          if (isLogged == true){
            
            userDetail();
            // console.log('userDetails', userDetails)

          }
        }, [token]);

        const userAuthentication = async ( email, password ) => {
            if (SecureStore.getItemAsync('token') !== null) {

              setIsLogged(false)
                SecureStore.deleteItemAsync('token')
            }

            const response = await axiosInstance.post('users/login', {
              email,
              password
            })
          
            try {
              if (response.status === 200) {
                SecureStore.setItemAsync('token', response.data.token)
                setIsLogged(true)
                return response.data.token
              } 
            } catch (e) {
              switch (e) {
              case e.request:
                console.log(e.request)
                console.log(e.message)
                break
              case e.response:
                console.log(e.response)
                console.log(e.message)
                break
              default:
                console.log(e.config)
              }
            }
              return response.data && response.data.token
        }

        const userLogout = async () => {
            if (SecureStore.getItemAsync('token') !== null) {
                SecureStore.deleteItemAsync('token')
                setIsLogged(false)
                setUserDetails({
                    id: "",
                    email: "",
                    firstName: "",
                    lastName: "",
                });
            }
        }


    return (
        <UserContext.Provider value={{userDetails, setUserDetails, userAuthentication, isLogged, setIsLogged, userLogout}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;
