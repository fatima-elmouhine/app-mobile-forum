import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react';
import UserContextProvider from './context/userContext.js';

import HomeScreen from './pages/HomeScreen';
import HomeLoggedScreen from './pages/HomeLoggedScreen.js';
import ProfileScreen from './pages/ProfileScreen.js';


const Stack = createStackNavigator();

function Routes() {

    // SecureStore.deleteItemAsync('token');
    const [jwt, setJwt] = useState(null);

    SecureStore.getItemAsync('token').then((token) => {
        setJwt(token)
    })

    console.log('jwt', jwt);

    // return (
    //     <UserContextProvider>
    //         <NavigationContainer>
    //             <Stack.Navigator>
    //                 <Stack.Screen options={{ headerShown: false}} name="HomeScreen" component={HomeScreen} />
    //                 <Stack.Screen options={{ headerShown: false}} name="HomeLoggedScreen" component={HomeLoggedScreen} />
    //                 <Stack.Screen options={{ headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     </UserContextProvider>
    // );

    if (!jwt) {
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false}} name="HomeScreen" component={HomeScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    } else {
        return (
            <UserContextProvider>
                <NavigationContainer>
                    <Stack.Navigator>
                        <Stack.Screen options={{ headerShown: false}} name="HomeLoggedScreen" component={HomeLoggedScreen} />
                        <Stack.Screen options={{ headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
                    </Stack.Navigator>
                </NavigationContainer>
            </UserContextProvider>
        );
    }
}

export default Routes;