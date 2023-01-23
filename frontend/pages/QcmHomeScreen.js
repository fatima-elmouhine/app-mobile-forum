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

export default function QcmHomeScreen({ navigation }) {



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
        <Text style={{fontSize:40, color:'white', marginTop:120, marginLeft:40, fontWeight:'bold'}}>
            QCM
        </Text>
        <View style={{flexDirection:'row', marginTop:20,  display:'flex', flexDirection:'column'}}>
            <View style={{  backgroundColor:'#94DFC9', padding:20, borderRadius:8, marginTop:50,
                marginLeft:20,
                marginRight:20,
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
                        labelStyle={{fontSize: 22}}
                        mode="contained"
                        style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        backgroundColor:'#94DFC9', padding:40, width:'100%', borderRadius:8}}

                        onPress={() => {
                        navigation.navigate('ListQcmScreen')}}
                    >
                        Liste des QCM

                    </Button>
            </View>
            <View style={{  
                backgroundColor:'#F66C1C', 
                padding:10,
                paddingBottom:40,
                paddingTop:40, 
                borderRadius:8, 
                marginTop:50,
                marginLeft:20,
                marginRight:20,
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
                        icon={require('../assets/logo/plus.png')}
                        labelStyle={{fontSize: 17,}}
                        mode="contained"
                        style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: 'flex',
                        backgroundColor:'#F66C1C', padding:4, width:'100%', borderRadius:8}}
                        onPress={() => {
                        navigation.navigate('NewTopicScreen')}}
                    >
                        Générer votre propre questionnaire

                    </Button>
            </View>
        </View>
        <Image
          source={require("../assets/logo_fond2.png")}
          style={styles.bgBottom}
        />
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
  bgBottom: {
    backgroundSize: "cover",
    borderWidth: 1,
    // borderColor: 'red',
    position: "absolute",
    bottom: 0,
    height: 150,
    // transform: [{ rotate: "180deg" }],
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
