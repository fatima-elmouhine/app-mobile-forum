import * as React from 'react';
import { StyleSheet, Text,Image, View, ScrollView, SafeAreaView, TouchableHighlight } from 'react-native';
import {useFonts,Roboto_400Regular,Roboto_400Regular_Italic} from "@expo-google-fonts/roboto";
import { ProgressBar, Avatar, MD3Colors } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
// import editLogo from '../assets/logo/edit.svg';
export default function HomeLoggedScreen() {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic
  });
    return (
      <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >
          <TouchableHighlight style={[styles.profileImgContainer]}>
            <Avatar.Image size={150} source={require('../assets/img-test/image1.png')}   style={styles.image}/>
            {/* <Image source={require('../assets/logo/edit.svg')}/> */}
            
          </TouchableHighlight>
        <Text style={styles.containerText}>
          <Text style={styles.name}>Janee Doe</Text>
          {/* <ProgressBar progress={0.5} color='#2D84EA' /> */}
          <ProgressBar progress={0.35} color='#00FAAF' style={styles.progress} />
          <Text style={styles.paragraphe}>Lvl.2</Text>
        </Text>

      </LinearGradient>
      </View>
    );
  }

  const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5
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

    // profileImgContainer: {
    //   borderWidth: 1,
    //   borderStyle: "dashed",
    //   borderColor: "#50F4E1",
      
    // },

    image: {
      overflow: "hidden",
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "#50F4E1",
 
    },

    containerText: {
      display: 'flex',
      fontSize: 20,
      color: '#fff',
    },
    name: {
      paddingLeft: 58,

    },
    paragraphe: {
      paddingLeft: 28,

    },
    progress: {
      marginTop: 10,
      width: 190,
      height: 20,
      borderRadius: 10,
      marginLeft: 28,
      marginRight: 28,
    }
  });