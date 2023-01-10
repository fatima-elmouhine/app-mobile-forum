import * as React from 'react';
import { StyleSheet, Text,Image, View, ScrollView, ImageBackground, TouchableHighlight } from 'react-native';
import {useFonts,Roboto_400Regular,Roboto_400Regular_Italic} from "@expo-google-fonts/roboto";
import { ProgressBar, Avatar, MD3Colors, IconButton } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import CourseCardComponent from '../component/CourseCard/CourseCardComponent';
export default function HomeLoggedScreen({navigation}) {

  function handlePressEdit() {
    navigation.navigate('HomeScreen');
    // console.log(navigation);
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic
  });

  const props = {
    title : 'Chapitre 1',
    color : 'white',
    description : 'Suspendisse pulvinar, augue ac venenatis condimentum, sem libe',
    link : 'https://www.youtube.com/watch?v=1Q8fG0TtVAY',
  }


  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
      <LinearGradient
        colors={['#000000', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >
          <View style={[styles.profileImgContainer]}>
            <Avatar.Image size={150} source={require('../assets/img-test/image1.png')}   style={styles.image}/>
            <IconButton
              icon={require('../assets/logo/edit.png')}
              iconColor='#00FAAF'
              style={styles.icon}
              size={30}
              onPress={() => {handlePressEdit()}}
            />
          </View>
        <Text style={styles.containerText}>
          <Text style={styles.name}>Janee Doe</Text>
          <ProgressBar progress={0.35} color='#00FAAF' style={styles.progress} />
          <Text style={styles.paragraphe}>Lvl.2</Text>
        </Text>
        <View style={styles.sectionLatestCourse}>
          <Text style={styles.sectionTitle}>Les derniers cours</Text>
          <CourseCardComponent course={props}/>
        </View>
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

    profileImgContainer: {
      zIndex: 4,
      top: 50,
      left: 28,
      position: 'relative',
    },

    image: {
      overflow: "hidden",
      borderWidth: 1,
      zIndex: 1,
      position: 'absolute',
      borderStyle: "dashed",
      borderColor: "#50F4E1",
 
    },
    icon: {
      zIndex: 2,
      position: 'absolute',
      top: 100,
      left: 110,
    },

    containerText: {
      display: 'flex',
      fontSize: 20,
      color: '#fff',
      marginTop: 200,
      marginLeft: 28,
    },
    name: {
      paddingLeft: 58,

    },
    paragraphe: {
      paddingLeft: 28,

    },
    progress: {
      marginTop: 10,
      width: 150,
      height: 20,
      borderRadius: 10,
      marginLeft: 28,
      marginRight: 28,
    },
    sectionTitle: {
      fontSize: 20,
      color: '#fff',
      marginTop: 70,
    }
  });