import * as React from 'react';
import { StyleSheet, Text,Image, View, ScrollView, ImageBackground, TouchableHighlight, Pressable } from 'react-native';
import {useFonts,Roboto_400Regular,Roboto_400Regular_Italic} from "@expo-google-fonts/roboto";
import { TextInput, Avatar, MD3Colors, IconButton, Button } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";

export default function ForumDetailScreen({route, navigation}) {
    console.log(route.params.id);

  const [pressed, setPressed] = React.useState(false);
  React.useEffect( () => {

  }, [])
  async function handleSaveEdit() {

    if (password !== '') {
        console.log('password changed');
    }else {
        console.log('password not changed');
    }
    const userInfo = {
        id: 3,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
    }

    try {
        const response = await putUser( userInfo)
        console.log(response);
        
    } catch (error) {
        console.log('ERROR DANS LE COMPONENT',error);
    }
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic
  });


  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
      <LinearGradient
        colors={['#000000', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >




      </LinearGradient>
    </View>
  );
  }

  const styles = StyleSheet.create({
    bgTop: {
      backgroundSize: 'cover',
      borderWidth: 1,
      // borderColor: 'red',
      position: 'absolute',
      top: 10,
      height:150,
      zIndex: 1,
      width: '100%',
      // backgroundPosition: 'bottom',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      backgroundImage: "url(../assets/img-test/image1.png)",
    },
    container: {
      // flex: 6,
      width: '100%',
      height: '100%',
      display: 'flex',
      fontFamily: "Roboto_400Regular",
      // paddingLeft: 28,
      margin: 0,

      // alignItems: 'center',
      // justifyContent: 'center',
    },
    containerGradient: {
      // flex: 6,
      width: '100%',
      height: '100%',
      display: 'flex',
      fontFamily: "Roboto_400Regular",
      paddingLeft: 28,
      margin: 0,
    },


  });