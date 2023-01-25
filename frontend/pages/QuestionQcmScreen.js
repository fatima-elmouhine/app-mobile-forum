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
import {getQcm} from "../api/Qcms/getQcm";
import SelectDropdown from 'react-native-select-dropdown'

export default function QuestionQcmScreen({ route, navigation }) {
    // const [checked, setChecked] = React.useState(false);
    const [qcmQuestion, setQcmQuestion] = React.useState({});
    const [questionTitle, setQuestionTitle] = React.useState("Question 1"); 
    const [qcmTitle, setQcmTitle] = React.useState(); 
    const [textInputValue, setTextInputValue] = React.useState({});
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    // on va le setter dans la boucle pour chaque question afin de récupérer les réponses cochées par l'utilisateur 
    //et les incrementer dans un tableau 
    const [answersChecked, setAnswersChecked] = React.useState({});
    const { idQcm } = route.params;



    useEffect(() => {
      async function fetchQcm() {
        const qcm = await getQcm(idQcm);
        setQcmTitle(qcm.title);
        setQcmQuestion(qcm.Questions);
        setCurrentQuestion(qcm.Questions[0]);
        // console.log('current question',currentQuestion);
      }

      fetchQcm();
    }, []);



    var letterArray = ["A", "B", "C", "D", "E"];

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
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 50,
            marginLeft: 40,
            color: "#fff",
          }}
        >
          {qcmTitle}
        </Text>
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
                marginTop: 10,
                marginLeft: 20,
                paddingBottom: 20,
            }}>
                <Button
                labelStyle={{fontSize: 17, color: "#fff"}}
                style={{
                    backgroundColor: "#00DC9A",
                    // padding: 20,
                    
                    borderRadius: 8,
                    // marginTop: 50,
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

                  <SelectDropdown
                      data={qcmQuestion}
                      onSelect={(selectedItem, index) => {
                        setCurrentQuestion(selectedItem);
                          // // setSelectedTheme(selectedItem.id);
                          // console.log(selectedItem, index)
                      }}
                      defaultButtonText={"Choissisez une question "}

                      buttonTextStyle={{fontSize: 18, color: 'white', textAlign:'left',}}
                      buttonStyle={{
                        width: 240,
                        whiteSpace: "wrap",

                        borderRadius:8, 
                        backgroundColor:'#232160',
                        display: "flex",
                        // marginTop: 50, 
                        marginLeft: 20, 
                        marginRight: 20, 
                        shadowColor: "#000", 
                        shadowOffset: {width: 0,height: 2,}, 
                        shadowOpacity: 0.25, shadowRadius: 4, 
                        elevation: 5, 
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                          // text represented after item is selected
                          // if data array is an array of objects then return selectedItem.property to render after item is selected
                          // return selectedItem.title
                          setQuestionTitle('Question ' + (index+1));

                          return 'Choissisez une question  ' 
                      }}
                      rowTextForSelection={(item, index) => {
                          // text represented for each item in dropdown
                          // if data array is an array of objects then return item.property to represent item in dropdown
                          return 'Question ' + (index+1)
                      }}
                  />
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
              {questionTitle}/{qcmQuestion.length}
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
                {currentQuestion.text}
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
              {currentQuestion.Answers?.map((answer, i) => (
  
                    <View style={{
                      display: "flex",
                      flexDirection: "row",
                      // justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      backgroundColor:'white',
                      fontSize: 19, borderRadius:8, color: "#86439D", fontWeight: "bold",   marginTop:20 ,padding:15
                      ,paddingRight: 20,
                      }}>

                    <Checkbox 
                        status={answersChecked[letterArray[i]] ? 'checked' : 'unchecked'}
                        color="#500E5D"
                        onPress={() => {
                            setAnswersChecked({
                                ...answersChecked,
                                [letterArray[i]]: !answersChecked[letterArray[i]],
                            });
                        }}
                        style={{
                          marginLeft: 16,
                        borderRadius: 8, 
                        marginBottom:0
                      }}/>
                      <Text style={{fontSize: 19, borderRadius:8, color: "#86439D", fontWeight: "bold",padding:15, paddingRight: 20}}>
                       {letterArray[i]}) {answer.text}
                      </Text>
                     </View>
                    ))

  
              }

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
