import * as React from 'react';
import { StyleSheet, Text, Image, View, ScrollView, ImageBackground, TouchableHighlight, SafeAreaView } from 'react-native';
import { useEffect, useContext, useState } from 'react';
import { useFonts, Roboto_400Regular, Roboto_400Regular_Italic } from "@expo-google-fonts/roboto";
import { ProgressBar, Avatar, MD3Colors, IconButton, Button } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import CourseCardComponent from '../component/CourseCard/CourseCardComponent';
import { getCourses } from '../api/Courses/getCourses';
import { UserContext } from '../context/UserContext';
import * as SecureStore from 'expo-secure-store';
// import { getUser } from '../api/Users/getUser';

export default function HomeLoggedScreen({navigation}) {

  const [courses, setCourses] = useState([]);
  const { userDetails } = useContext(UserContext);

  useEffect( () => {
    async function getCoursesInHome() {
      const coursesReq = await getCourses();
      setCourses(coursesReq);
    }
    getCoursesInHome();
  }, [])

  function handlePressEdit() {
    navigation.navigate('ProfileScreen');
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic
  });

  
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
      <LinearGradient
        colors={['purple', '#02254F','#2D84EA']}
        style={styles.containerGradient}
      >
        <View style={[styles.profileImgContainer]}>
          <Avatar.Image size={150} source={require('../assets/img-test/image1.png')}   style={styles.image}/>
          <IconButton
            icon={require('../assets/logo/edit.png')}
            iconColor='#00FAAF'
            style={styles.icon}
            size={20}
            onPress={() => {handlePressEdit()}}
          />
        </View>
        <Text style={styles.containerText}>
          <Text style={{flexDirection: 'column'}}>
            <Text style={styles.name}>{userDetails.email}</Text>
            <ProgressBar progress={0.35} color='#00FAAF' style={styles.progress} />
            <Text style={styles.paragraphe}>Lvl.2</Text>
          </Text>
        </Text>
        <ScrollView  style={{display:'flex', flexDirection:'column', margin:10, marginTop:40}}>
          <View style={styles.sectionLatestCourse}>
            <Text style={styles.sectionTitle}>Les derniers cours</Text>
            { courses.length !== 0 && 
              courses.map((course,i) => {
                return (
                  <CourseCardComponent key={i}  course={course}/>
                )
              })
            }
            { courses.length !== 0 && 
              courses.map((course,i) => {
                return (
                  <CourseCardComponent key={i}  course={course}/>
                )
              })
            }
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
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
  },

  profileImgContainer: {
    zIndex: 4,
    top: 50,
    alignItems: 'flex-start',
  },

  image: {
    overflow: "hidden",
    borderWidth: 1,
    zIndex: 1,
    borderStyle: "dashed",
    borderColor: "#50F4E1",
  },

  icon: {
    position: 'absolute',
    zIndex: 2,
    
  },

  containerText: {
    color: '#fff',
  },

  name: {
    
  },

  paragraphe: {
    
  },

  progress: {
    
    width: 150,
    height: 20,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 20,
    color: '#fff',
    marginTop: 70,
  }
});