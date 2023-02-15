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
  Alert,
} from "react-native";
import { useEffect, useContext, useState } from "react";

import {
  ProgressBar,
  Avatar,
  MD3Colors,
  Checkbox,
  Button,
  Dialog, Portal , Provider
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {getQcm} from "../api/Qcms/getQcm";
import SelectDropdown from 'react-native-select-dropdown'
import {playQcmUser } from "../api/Qcms/playQcmUser";


export default function QuestionQcmScreen({ route, navigation }) {

    const [qcmQuestion, setQcmQuestion] = React.useState({});
    const [questionTitle, setQuestionTitle] = React.useState("Question 1"); 
    const [qcmTitle, setQcmTitle] = React.useState();
    const [questionId, setQuestionId] = React.useState();
    const [textInputValue, setTextInputValue] = React.useState({});
    const [currentQuestion, setCurrentQuestion] = React.useState(0);
    const [nextQuestion, setNextQuestion] = React.useState(0);
    const [goodAnswer, setGoodAnswer] = React.useState({});
    const [indexQuestion, setIndexQuestion] = React.useState(0);
    const [answersChecked, setAnswersChecked] = React.useState({});
    const letterArray = ["A", "B", "C", "D", "E"];
    const { idQcm } = route.params;
    const [saveGame, setSaveGame] = React.useState({});


    var errorsArray = []

    function filterGoodAnswersUser(){
        var arrayAnswersUser = []
        for (var element in answersChecked) {
           for(var [key, value] of Object.entries(answersChecked[element])){
                if(value == true){
                        arrayAnswersUser = [
                            ...arrayAnswersUser,
                            {
                                questionId : element,
                                letter : [key]
                            }
                        ]
                }else{
                    arrayAnswersUser = [
                        ...arrayAnswersUser,
                        {
                            questionId : element,
                            letter : []
                        }
                    ]
                }
           }

        }

        const newArray = arrayAnswersUser.reduce((acc, current) => {
            const x = acc.find(item => item.questionId == current.questionId);

            if (!x) {
                return acc.concat([current]);
            } else {
                x.letter = x.letter.concat(current.letter);
                return acc;
            }
        }, []);

        return newArray
    }

    function countDifferences(array1, array2, id) {

        array1.sort();
        array2.sort();

        let count = 0;

        var arrNotIn = []
        var arrIn = []
        if(JSON.stringify(array1) !== JSON.stringify(array2)){
   
            for (var i in array1) {
                for (var j in array2) {
                    if (array1[i] === array2[j]) {
                        if (!arrIn.includes(array2[j])) {
                            arrIn.push(array2[j])
                        }
                    }
                    
                    if(!array1.includes(array2[j]) && array1[i] !== array2[j]){  
                        if (!arrNotIn.includes(array2[j])) {
                            arrNotIn.push(array2[j])
                            count++
                        } 
                    }

                }
            }
        }

        if(arrNotIn.length > 0){
            count += array1.length - arrIn.length
        }

        return count;
    }

    function calculScoreByError(id){

        for(var i = 0; i < errorsArray.length; i++){

            if(errorsArray[i].questionId == id){
                switch (errorsArray[i].nbrErr) {
                    case 0:
                        errorsArray[i].score = 1
                        break;
                    case 1:
                        errorsArray[i].score = 0.5
                        break;
                    case 2:
                        errorsArray[i].score = 0.2
                        break;
                    default:
                        errorsArray[i].score = 0
                        break;

                }
                return errorsArray[i].score
            }
        }
      
    }

    async function saveOneGame(){
      correctionGame()
      if( errorsArray.length !== 0){

          const game =  await playQcmUser(idQcm, answersChecked, textInputValue, errorsArray)
          
          navigation.navigate("ScoreScreen", {
              idQcmUser: game.id,         
            })
       }
    }

    function correctionGame(){
      const userAnswer = filterGoodAnswersUser()


      //  useEffect(() => {
          for (const [key, value] of Object.entries(userAnswer)) {
      
              goodAnswer.forEach((element, i) => {
                  var correctionAnswer = element
                  var id = element.questionId
                  if(value.questionId == element.questionId){
                      let differences = countDifferences(correctionAnswer.letter, value.letter, id)
                      if(value.letter.length == 0){
                          differences ="nr"
                      }
                      
                      errorsArray = [
                          ...errorsArray,
                          errorsArray[value.questionId] = {
                              questionId: value.questionId,
                              nbrErr: differences,
                          }
                      ]
                      calculScoreByError(id)
      
                  }
              });
          }
    }

    const createTwoButtonAlert = () =>
    Alert.alert('Terminer le quizz ?', 'Êtes-vous sûr de vouloir terminer la partie ?', [
      {
        text: 'Annuler',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Confirmer', onPress: () => {
        saveOneGame()

        fetchQcm()




        }
      },
    ]);


 

    async function fetchQcm() {
      const data = await getQcm(idQcm);
      const arrayAnswers = data.answers;
      const qcm = data.qcm

      setTextInputValue(data);
      setQcmTitle(qcm[0].title);
      setQcmQuestion(qcm[0].Questions);
      setCurrentQuestion(qcm[0].Questions[indexQuestion]);
      setQuestionId(qcm[0].Questions[indexQuestion].id);
      setGoodAnswer(arrayAnswers);
      var userAnswers = {};
      
      for (let i = 0; i < qcm[0].Questions.length; i++) {
        userAnswers[qcm[0].Questions[i].id] = {
          A: false,
          B: false,
          C: false,
          D: false,
          E: false,
        };
      }

      setAnswersChecked(userAnswers);

    }
    useEffect(() => {

      fetchQcm();
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
                onPress={() => {
                  createTwoButtonAlert();
                }}
                >
                    Terminer
                </Button>

                  <SelectDropdown
                      data={qcmQuestion}
                      onSelect={(selectedItem, index) => {
                        setIndexQuestion(index);
                        setCurrentQuestion(qcmQuestion[index]);
                        setQuestionId(qcmQuestion[index].id);


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
              {questionTitle}/{qcmQuestion?.length}
            </Text>

            {/* <Button
                labelStyle={{fontSize: 17, color: "#fff"}}
                style={{
                    backgroundColor: "#FF00B8",
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
                onPress={() => {
                  // console.log('current question',currentQuestion.id);
                  console.log('current question',questionTitle);
                  
                  // setIndexQuestion(indexQuestion+1);
                  
                  if (indexQuestion == qcmQuestion?.length) {
                    // alert('Vous avez terminé le QCM');
                    // console.log('current question',qcmQuestion);
                    setIndexQuestion(1);
                    setCurrentQuestion(qcmQuestion[0]);
                    setQuestionId(qcmQuestion[0].id);
                    setQuestionTitle('Question ' + 1);
                  }else{

                    setCurrentQuestion(nextQuestion);
                    setQuestionId(nextQuestion.id);
                    setIndexQuestion(indexQuestion+1);
                    setQuestionTitle('Question ' + (indexQuestion+1));

                  }
                  // console.log('next question',questionTitle);
                  
                }}
                >
                    Suivant
            </Button> */}

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
                {currentQuestion?.text}
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
              {currentQuestion?.Answers?.map((answer, i) => {
                // setAnswersChecked({
                //   ...answersChecked,
                //   [currentQuestion.id] : {
                //     [letterArray[i]]: false,
                //   }
                // });
                // console.log('answersChecked',answersChecked);
                return (
                    <View key={i} style={{
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
                        status={( (questionId != undefined && answersChecked[questionId]) && answersChecked[questionId][letterArray[i]]) ? 'checked' : 'unchecked'}
                        color="#500E5D"
                        onPress={() => {
                          (questionId != undefined && answersChecked[questionId]) &&
                            setAnswersChecked({
                                ...answersChecked,
                                [questionId] : {
                                  ...answersChecked[questionId],
                                  [letterArray[i]]: !answersChecked[questionId][letterArray[i]],
                                }
                                
                            });
                        }}
                        style={{
                          marginLeft: 16,
                        borderRadius: 8, 
                        marginBottom:0
                      }}/>
                      <Text style={{fontSize: 19, borderRadius:8, color: "#86439D", fontWeight: "bold",padding:15, paddingRight: 20}}>
                       {letterArray[i]}) {answer.text} {answer.isCorrect_answer}
                      </Text>
                     </View>
                    )})

  
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
    // paddingLeft: 28,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  containerGradient: {
    // flex: 6,
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
