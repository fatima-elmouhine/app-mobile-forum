import { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

const UserContextProvider = (props) =>  {

    const [token, setToken] = useState(null);

    SecureStore.getItemAsync('token').then((jwt) => {
        console.log('token', jwt);
        setToken(jwt);
    });


    const decodedToken = token ? jwtDecode(token) : null;
    // console.log('decodedToken', decodedToken);
    
        const [userDetails, setUserDetails] = useState({
            id: "",
            email: "",
            firstName: "",
            lastName: "",
        });
        // console.log('userDetails', userDetails);
        useEffect(() => {
            SecureStore.getItemAsync('token')
            setUserDetails({
                id: decodedToken?.id,
                email: decodedToken?.email,
                firstName: decodedToken?.firstName,
                lastName: decodedToken?.lastName,
            });
        }, [token]);

    return (
        <UserContext.Provider value={{userDetails, setUserDetails}}>
            {props.children}
        </UserContext.Provider>
    );
    
}

export default UserContextProvider;