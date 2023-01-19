import * as React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";

import {

  Button,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { getThemes } from "../api/Themes/getThemes";
import { UserContext } from "../context/UserContext";

export default function SectionChoiceScreen({route, navigation }) {
  const { title, id, description } = route.params;
  const [themes, setThemes] = useState([]);

  useEffect( () => {

    async function getThemesInScreen() {
        const themesReq = await getThemes();
        setThemes(themesReq);
    }
    getThemesInScreen();
}, []);



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
          {title}
        </Text>
        <Text style={{fontSize:20, color:'white', marginTop:10, marginLeft:10}}>
          {description}
        </Text>

                <ScrollView>
                    <View style={{ display:'flex',  alignItems:'center', justifyContent:'center', }} >
                      <View style={{ display:'flex', flexDirection:'column', flexWrap:'wrap',  alignItems:'center', justifyContent:'center'}} >
                          <View style={{  backgroundColor:'#3AC49A', padding:60, borderRadius:8, marginTop:50, fontSize:20,
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                        }} >
                          <Button
                              icon={require('../assets/logo/book.png')}
                              labelStyle={{fontSize: 40}}
                              // color="white"
                              mode="contained"
                              style={{backgroundColor:'#3AC49A', borderRadius:8,}}

                              // onPress={() => Linking.openURL(props.course.link)}
                          >
                              <Text style={{fontSize:21, color:'white'}}>
                             Cours
                              </Text>
                          </Button>
                          </View>
                          <View style={{  backgroundColor:'#DC31D5', padding:60, borderRadius:8, marginTop:50,
                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                              elevation: 5,
                        }} >
                          <Button
                              icon={require('../assets/logo/forum.png')}
                              labelStyle={{fontSize: 45,}}
                              // color="white"
                              mode="contained"
                              style={{backgroundColor:'#DC31D5', borderRadius:8,}}

                              onPress={() => {
                                console.log('title : ',title),
                                navigation.navigate('ForumScreen', {title:title})}}
                          >
                              <Text style={{fontSize:21, color:'white'}}>
                                Forum
                              </Text>

                          </Button>
                          </View>
                          <View style={{  backgroundColor:'#F5C035', padding:60, borderRadius:8, marginTop:50,
                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 4,
                              elevation: 5,
                        
                        }} >
                          <Button
                              icon={require('../assets/logo/question.png')}
                              labelStyle={{fontSize: 45}}
                              // color="white"
                              mode="contained"
                              style={{backgroundColor:'#F5C035', borderRadius:8,}}

                              // onPress={() => Linking.openURL(props.course.link)}
                          >
                              <Text style={{fontSize:21, color:'white'}}>
                                QCM
                              </Text>

                          </Button>
                          </View>
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

