import React, {useEffect, useState, useContext} from 'react'
import { View, Text } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import * as SecureStore from 'expo-secure-store';


function MenuButton() {

    const navigation = useNavigation();
    const { userDetails } = useContext(UserContext);
    console.log(userDetails.mail)
    const actions = [
        {
          text: "Forum",
          name: "ForumScreen",
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
        <FloatingAction
            actions={actions}
            onPressItem={name => {
                if ( name === 'Logout' ) {
                    SecureStore.deleteItemAsync('token');
                    return navigation.navigate('HomeScreen');
                };
                return navigation.navigate(`${name}`);
            }}
        />
    </View>
  )
}

export default MenuButton