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
  Checkbox,
  Button,
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";


export default function QuestionQcmScreen({ route, navigation }) {
    // const [checked, setChecked] = React.useState(false);
    const [textInputValue, setTextInputValue] = React.useState("");
    const [answersChecked, setAnswersChecked] = React.useState({
        question: "",
        A: false,
        B: false,
        C: false,
        D: false,
        E: false,
    });
    const { idQcm } = route.params;

    console.log(idQcm);



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
        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",

        }}>

            <View style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 50,
                marginLeft: 20,
                paddingBottom: 20,
            }}>
                <Button
                labelStyle={{fontSize: 17, color: "#fff"}}
                style={{
                    backgroundColor: "#00DC9A",
                    // padding: 20,
                    
                    borderRadius: 8,
                    marginTop: 50,
                    marginLeft: 20,
                    marginRight: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                    width: 0,
                    height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                }}
                >
                    Terminer
                </Button>
                <Button
                    labelStyle={{fontSize: 17, color: "#fff"}}
                    style={{
                        backgroundColor: "#232160",
                        // padding: 20,
                        
                        borderRadius: 8,
                        marginTop: 50,
                        marginLeft: 20,
                        marginRight: 20,
                        shadowColor: "#000",
                        shadowOffset: {
                        width: 0,
                        height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 4,
                        elevation: 5,
                    }}
                >
                    Choisissez une question
                </Button>
            </View>

        </View>
    <ScrollView>

        <View style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginLeft: 40,
            marginRight: 20,
        }}>
            <Text style={{fontSize: 22, color: "#FF00B8", fontWeight: "bold"}}>
                Question 1/20
            </Text>

        </View>

        <View style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            marginLeft: 30,
            marginRight: 30,
            paddingBottom: 80,
            
        }}>
            <Text style={{fontSize: 19, borderRadius:8, color: "#86439D",backgroundColor:'white', fontWeight: "bold",  marginTop: 20, padding:20}}>
                On considère un système thermodynamique. Lors d'une réaction chimique à 300 K, on mesure Q la quantité 
                de chaleur liée à la réaction et on trouve -600 J / mol. On désire étudier la variation d'entropie molaire 
                liée à cette transformation.
            </Text>
            <Text 
                style={{fontSize: 14, borderRadius:8, color: "#FF00B8", fontWeight: "bold",  marginTop: 20,}}
            >
                Choisissez la/les bonne(s) proposition(s) ?
            </Text>
            <View style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                marginTop: 10,
            }}>
                    <Text style={{fontSize: 19, borderRadius:8, color: "#86439D",backgroundColor:'white', fontWeight: "bold",  marginTop: 20, padding:20}}>
                        A. 0
                    </Text>
                    <Text style={{fontSize: 19, borderRadius:8, color: "#86439D",backgroundColor:'white', fontWeight: "bold",  marginTop: 20, padding:20}}>
                        B. 0
                    </Text>
                    <Text style={{fontSize: 19, borderRadius:8, color: "#86439D",backgroundColor:'white', fontWeight: "bold",  marginTop: 20, padding:20}}>
                        C. 0
                    </Text>
                    <Text style={{fontSize: 19, borderRadius:8, color: "#86439D",backgroundColor:'white', fontWeight: "bold",  marginTop: 20, padding:20}}>
                        D. 0
                    </Text>
                    <Text style={{fontSize: 19, borderRadius:8, color: "#86439D",backgroundColor:'white', fontWeight: "bold",  marginTop: 20, padding:20}}>
                        E. 0
                    </Text>

            </View>
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
