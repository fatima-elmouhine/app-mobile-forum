import { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

const UserContextProvider = (props) =>  {

    const [token, setToken] = useState(null);

    SecureStore.getItemAsync('token').then((jwt) => {
        setToken(jwt);
    });

    const decodedToken = token ? jwtDecode(token) : null;
    
        const [userDetails, setUserDetails] = useState({
            id: "",
            email: "",
        });
        console.log('userDetails', userDetails);
        useEffect(() => {
            SecureStore.getItemAsync('token')
            setUserDetails({
                id: decodedToken?.id,
                email: decodedToken?.email,
            });
        }, [token]);

    return (
        <UserContext.Provider value={{userDetails, setUserDetails}}>
            {props.children}
        </UserContext.Provider>
    );
    
}

export default UserContextProvider;