import React, {useEffect, useState, useContext} from 'react'
import { View, Text } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import * as SecureStore from 'expo-secure-store';


function MenuButton() {

    const navigation = useNavigation();
    const {isLogged, userLogout} = useContext(UserContext);
    console.log('isLogged', isLogged);

    if (isLogged === false) {
         return navigation.navigate('HomeScreen');;
    }

    const actions = [
        {
          text: "Themes",
          name: "ThemeScreen",
          position: 0
        },
        {
          text: "Forum",
          name: "ForumHomeScreen",
          position: 2
        },
        {
          text: "Profile",
          name: "ProfileScreen",
          position: 1
        },
        {
          text: "Home",
          name: "HomeLoggedScreen",
          position: 3
        },
        {
          text: "Logout",
          name: "Logout",
          position: 4
        }
      ];
  return (
    <View style={{}}>
    {isLogged === true &&
        <FloatingAction
            actions={actions}
            onPressItem={name => {
                if ( name === 'Logout' ) {
                    userLogout();
                    return navigation.navigate('HomeScreen');

                };
                return navigation.navigate(`${name}`);
            }}
        />
      }
    </View>
  )
}

export default MenuButton