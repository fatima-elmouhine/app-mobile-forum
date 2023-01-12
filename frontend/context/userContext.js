import { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store'
import jwtDecode from 'jwt-decode';

export const UserContext = createContext();

const UserContextProvider = (props) =>  {
    const [token, setToken] = useState(null);

    SecureStore.getItemAsync('token').then((jwt) => {
        setToken(jwt);
    });

    const decode = jwtDecode(token);
    
    const [userDetails, setUserDetails] = useState({
        user: {
            id: decode.id,
            email: decode.email,
        }
    });
    console.log('context', userDetails);

    return (
        <UserContext.Provider value={{userDetails, setUserDetails}}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserContextProvider;