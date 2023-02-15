import React, {useEffect, useState, useContext} from 'react'
import { View, Text } from 'react-native';
import { FloatingAction } from "react-native-floating-action";
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import * as SecureStore from 'expo-secure-store';


function MenuButton() {

    const navigation = useNavigation();
    const {isLogged, userLogout} = useContext(UserContext);

    if (isLogged === false) {
         return navigation.navigate('HomeScreen');;
    }

    const actions = [
        {
          text: "Themes",
          name: "ThemeScreen",
          icon: require("../assets/logo/theme.png"),
          color: "#FF2F6D",
          buttonSize:45,
          size:90,
          margin:0,
          position: 0
        },
        {
          text: "QCM",
          name: "QcmHomeScreen",
          icon: require("../assets/logo/question.png"),
          color: "#9DC726",
          buttonSize:45,
          size:90,
          margin:0,
          position: 1
        },
        {
          text: "Cours",
          icon: require("../assets/logo/book.png"),
          color: "#FFAC2F",
          name: "CoursesScreen",
          buttonSize:45,
          size:90,
          margin:0,
          position: 2
        },
        {
          text: "Forum",
          icon: require("../assets/logo/forum.png"),
          name: "ForumHomeScreen",
          color: "#C253A3",
          buttonSize:45,
          size:90,
          margin:0,
          position: 3
        },
        {
          text: "Profile",
          icon: require("../assets/logo/profil.png"),
          name: "ProfileScreen",
          color: "#53C2B5",
          buttonSize:45,
          size:90,
          margin:0,
          position: 4
        },
        {
          text: "Home",
          icon: require("../assets/logo/home.png"),
          name: "HomeLoggedScreen",
          color: "#2FC1FF",
          buttonSize: 45,
          size:90,
          margin:0,
          position: 5
        },
        {
          text: "Se déconnecter",
          icon: require("../assets/logo/loggout.png"),
          name: "Logout",
          color: "#ED0D0D",
          buttonSize: 45,
          size:90,
          margin:0,
          position: 6
        }
      ];
  return (
    <View>
    {isLogged === true &&
        <FloatingAction
            color='#8D13AB'
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