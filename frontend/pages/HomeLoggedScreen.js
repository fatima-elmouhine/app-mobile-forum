import * as React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useContext, useState } from "react";

import {
  ProgressBar,
  Avatar,
  MD3Colors,
  IconButton,
  Button,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import CourseCardComponent from "../component/CourseCard/CourseCardComponent";
import { getCourses } from "../api/Courses/getCourses";
import { UserContext } from "../context/UserContext";
import * as SecureStore from "expo-secure-store";
// import { getUser } from '../api/Users/getUser';

export default function HomeLoggedScreen({ navigation }) {
  const [courses, setCourses] = useState([]);
  const { userDetails,isLogged } = useContext(UserContext);
//   if (isLogged === false) {
//     return navigation.navigate('HomeScreen');;
// }
  useEffect( () => {

    async function getCoursesInHome() {
      const coursesReq = await getCourses('limit=3&order=createdAt:DESC');
      setCourses(coursesReq);
    }
    // console.log(userDetails)
    getCoursesInHome();
  }, []);

  function handlePressEdit() {
    navigation.navigate("ProfileScreen");
  }


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["purple", "#02254F", "#2D84EA"]}
        style={styles.containerGradient}
      >
        <Image
          source={require("../assets/logo_fond.png")}
          style={styles.bgTop}
        />
        <View style={[styles.profileImgContainer]}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handlePressEdit();
              }}
            >
              {userDetails?.avatar &&
              <Avatar.Image
                size={120}
                source={{uri : userDetails?.avatar}}
                style={styles.image}
                onPress={() => {
                  handlePressEdit();
                }}
              />}
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: "60%",
              }}
            >
              <Text style={styles.name}>{userDetails.firstName} {userDetails.lastName}</Text>
              <View
                style={{
                  flexDirection: "row",
                  position: "absolute",
                  bottom: 0,
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ProgressBar
                  progress={0.5}
                  color="#00FAAF"
                  style={styles.progress}
                />
                <Text style={styles.paragraphe}>Lvl.2</Text>
              </View>
            </View>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Mes derniers cours</Text>
        <ScrollView style={{ display: "flex", flexDirection: "column" }}>
          <View style={styles.sectionLatestCourse}>
            {courses.length !== 0 &&
              courses.map((course, i) => {
                return <CourseCardComponent key={i} course={course} />;
              })}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bgTop: {
    backgroundSize: "cover",
    borderWidth: 1,
    // borderColor: 'red',
    position: "absolute",
    height: 150,
    width: "100%",
    // backgroundPosition: 'bottom',
  },

  linearGradient: {
    flex: 1,
    backgroundImage: "url(../assets/img-test/image1.png)",
  },

  container: {
    width: "100%",
    height: "100%",
  },

  containerGradient: {
    width: "100%",
    height: "100%",
  },

  profileImgContainer: {
    marginHorizontal: 16,
    marginTop: 50,
    justifyContent: "space-between",
    marginBottom: 64,
  },

  image: {
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#50F4E1",
  },

  containerText: {},

  name: {
    fontSize: 20,
    color: "#fff",
  },

  paragraphe: {
    fontSize: 15,
    color: "#fff",
  },

  progress: {
    width: 150,
    height: 20,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 20,
    marginHorizontal: 16,
    color: "#fff",
    marginBottom: 24,
  },
});
