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
  useFonts,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
} from "@expo-google-fonts/roboto";
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
  const { userDetails } = useContext(UserContext);


  useEffect(() => {
    async function getCoursesInHome() {
      const coursesReq = await getCourses();
      setCourses(coursesReq);
    }
    getCoursesInHome();
  }, []);

  function handlePressEdit() {
    navigation.navigate("ProfileScreen");
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic,
  });

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
              <Avatar.Image
                size={120}
                source={require("../assets/img-test/image1.png")}
                style={styles.image}
                onPress={() => {
                  handlePressEdit();
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                width: "60%",
              }}
            >
              <Text style={styles.name}>Zak Lucien</Text>
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
    backgroundImage: "url(../assets/img-test/image1.png)",
  },

  container: {
    // flex: 6,
    width: "100%",
    height: "100%",
    fontFamily: "Roboto_400Regular",
    // paddingLeft: 28,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  containerGradient: {
    // flex: 6,
    width: "100%",
    height: "100%",
    fontFamily: "Roboto_400Regular",
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
