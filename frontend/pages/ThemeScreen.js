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
import { getThemes } from "../api/Themes/getThemes";
import { UserContext } from "../context/UserContext";
import CardTheme from '../component/Forum/CardTheme';

export default function ThemeScreen({ navigation }) {
  const [themes, setThemes] = useState([]);
  const { userDetails,isLogged } = useContext(UserContext);
//   if (isLogged === false) {
//     return navigation.navigate('HomeScreen');;
// }
  useEffect( () => {

    async function getThemesInScreen() {
        const themesReq = await getThemes();
        setThemes(themesReq);
    }
    getThemesInScreen();
}, []);




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
        <View style={styles.profileImgContainer}>
        <Text style={{fontSize:40, color:'white', marginTop:50, marginLeft:10, fontWeight:'bold'}}>
            Themes
        </Text>

                <ScrollView>
                    <View style={{ display:'flex',  alignItems:'center', justifyContent:'center', }} >
                        <View style={{ display:'flex', flexDirection:'row', flexWrap:'wrap', width:'90%', alignItems:'center', justifyContent:'center',}} >
                                {themes.map((theme) => {
                                    console.log('themes', theme)
                                    return (
                                        <View style={{marginRight:25}}>
                                            <CardTheme
                                                key={theme.id}
                                                title={theme.title}
                                                navigation={navigation}
                                                num={120}
                                            />
                                        </View>
                                )})}
                                {themes.map((theme) => {
                                    console.log('themes', theme)
                                    return (
                                        <View style={{marginRight:25}}>
                                            <CardTheme
                                                key={theme.id}
                                                title={theme.title}
                                                navigation={navigation}
                                                num={120}
                                            />
                                        </View>
                                )})}
                                {themes.map((theme) => {
                                    // console.log('themes', theme)
                                    // console.log('themes description', theme?.description)
                                    return (
                                        <View style={{marginRight:25}}>
                                            <CardTheme
                                                key={theme.id}
                                                id={theme.id}
                                                title={theme.title}
                                                description={theme.description}
                                                num={120}
                                                navigation={navigation}
                                            />
                                        </View>
                                )})}
                        </View>
                    </View>
                </ScrollView>
        </View>

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

