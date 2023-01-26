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
  DataTable
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import {getQcm} from "../api/Qcms/getQcm";
import SelectDropdown from 'react-native-select-dropdown'
import { set } from "date-fns";

export default function ScoreScreen({ route, navigation }) {

    const nbrQuestion = route.params.qcmQuestion.length
    const answersUser = route.params.answersChecked
    const goodAnswer  = route.params.goodAnswer
    const [scoreEnd, setScoreEnd] = useState(0)
    var scoreTotal = nbrQuestion
    const letterArray = ['A', 'B', 'C', 'D', 'E']
    var errorsArray = []

    function addToErrorsArray(id){
       
        for(var i = 0; i < errorsArray.length; i++){
            if(errorsArray[i].questionId == id){
                errorsArray[i].nbrErr++
                return
            }
        }
       
        errorsArray = [
            ...errorsArray,
            errorsArray[id] = {
                questionId: id,
                nbrErr: 1,
            }
        ]
    }

    function compareAnswer(correctionAnswer, value, id){
        for(var i = 0; i < letterArray.length; i++){
            if(correctionAnswer[letterArray[i]] != value[letterArray[i]]){
                addToErrorsArray(id)
            }

        }
    }

    function calculScoreByError(id){

        for(var i = 0; i < errorsArray.length; i++){
            if(errorsArray[i].questionId == id){
                switch (errorsArray[i].nbrErr) {
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
    function calculScoreTotal(){
        var scoreStart = 0
        
        var arrayBadAnswerId = []
        for(var i = 0; i < errorsArray.length; i++){
            for (var value in answersUser) {
                if(errorsArray[i].questionId == value){
                    scoreStart += errorsArray[i].score
                    arrayBadAnswerId.push(value)

                }
            }
        }

        var scorePoint1 = scoreTotal - arrayBadAnswerId.length
        scoreStart += scorePoint1
        setScoreEnd(parseFloat(scoreStart).toFixed(1))
    }

    function returnNbrError(id){
        for(var i = 0; i < errorsArray.length; i++){
            if(errorsArray[i].questionId == id){
                return errorsArray[i].nbrErr
            }
        }
    }

    function returnScore(id){
        for(var i = 0; i < errorsArray.length; i++){
            if(errorsArray[i].questionId == id){
                return errorsArray[i].score
            }
        }
    }

    useEffect(() => {
        calculScoreTotal()
    }, [])


    for (const [key, value] of Object.entries(answersUser)) {
        goodAnswer.forEach((element, i) => {
            var correctionAnswer = element
            var id = element.questionId
            if(key == element.questionId){
                compareAnswer(correctionAnswer, value, id)
                calculScoreByError(id)
                
            }
        });
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
        <ScrollView style={{
        width:'100%',
        marginBottom:40,
            }}>
        <View style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            marginTop:100,
            width:'100%',
            
            
        }}>
            <View style={{display:'flex', alignItems:'flex-start', flexDirection:'row', width:'100%',justifyContent:'center'}}>
                <View style={{}}>
                        <Avatar.Text size={120} style={{marginLeft:15, marginBottom:20, backgroundColor:'#caca'}} label={
                        <Text >
                            theme
                        </Text>
                        } />
                </View>
                <View style={{display:'flex', alignItems:'flex-start', justifyContent:'center', marginLeft:20}}>
                    <Text
                        style={{
                            fontSize: 27,
                            color: "#FF00B8",
                            marginLeft: 10,
                            width:200,
                            marginTop: 20,
                            fontWeight:'bold',
                        }}
                    >
                        QCM {route.params.qcmTitle}
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            color: "white",
                            marginLeft: 10,
                            marginTop: 20,
                            }}
                    >
                        {nbrQuestion} question{nbrQuestion > 1 && 's'}
                    </Text>
            </View>
            </View>
            <View style={{
                display:'flex', 
                flexDirection:'row',
                width:'100%',
                alignItems:'center',
                justifyContent:'center',
             }}>
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        // marginLeft: 10,
                        marginTop: 20,
                        fontWeight:'bold',
                    }}
                >
                    Vous avez obtenu le <Text style={{
                        fontWeight:'bold',
                        color:'#FFE600'
                    }}>score</Text> de :
                </Text>
                <Text
                    style={{
                        fontSize: 24,
                        color: "#8FFF00",
                        marginLeft: 10,
                        marginTop: 20,
                        fontWeight:'bold',
                        borderWidth:1,
                        borderColor:'#8FFF00',
                        padding:5,
                        borderRadius:5,
                    }}
                >
                   {scoreEnd}/{nbrQuestion}
                </Text>
            </View>

            <View style={{
                width:'100%',
                display:'flex',
                alignItems:'center',
                marginBottom:20,
            }}>
                <Button
                labelStyle={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "white",

                }}
                style={{
                    marginTop: 25,
                    width: 200,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "#00DC9A",
                    textAlign: "center",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                >
                    Voir la correction
                </Button>
            </View>

            <View 
                style={{
                    width:'100%',
                    // marginLeft:55,
                    display:'flex',
                    // alignItems:'end',
                    justifyContent:'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        marginLeft:35,
                        // marginLeft: 10,
                        marginTop: 20,
                        fontWeight:'bold',
                      
                    }}
                >
                    Vos résultats :
                </Text>
                <View style={{
                    // width:320,
                    // display:'flex',
                    // height:200,
                    alignItems:'center',
                    justifyContent:'center',

                    padding:10,
                    margin:15,
                    backgroundColor:'#251245',
                    marginTop:20,
                    borderRadius:10,
                }}>
                        <DataTable>
                            <DataTable.Header>
                                <DataTable.Title
                                    textStyle={{
                                        color:'#FF00B8',
                                        fontSize:20,
                                        fontWeight:'bold',

                                    }}>Question</DataTable.Title>
                                <DataTable.Title numeric
                                
                                textStyle={{
                                    color:'#FDB2FF',
                                    fontSize:20,

                                }}>Erreur</DataTable.Title>
                                <DataTable.Title numeric
                                textStyle={{
                                    color:'#FFE600',
                                    fontSize:20,

                                }}
                                >Point</DataTable.Title>
                            </DataTable.Header>
                        {Object.entries(answersUser).map((answer, i) => {
                            const nbrErrorFound = returnNbrError(answer[0])
                            var msgError = nbrErrorFound > 1 ? ' erreurs' : ' erreur'
                            const nbrPoint = nbrErrorFound == undefined ? 1 : returnScore(answer[0])
                            
                            
                           return ( <DataTable.Row key={i}>
                                <DataTable.Cell 
                                    textStyle={{
                                        color:'#FF00B8',
                                        fontSize:18,
                                        fontWeight:'bold',

                                    }}>Question {i+1}</DataTable.Cell>
                                <DataTable.Cell numeric 
                                textStyle={{
                                    color:'#FDB2FF',
                                    fontSize:18,

                                 }}>{nbrErrorFound != undefined ?
                                    nbrErrorFound + msgError : '0 erreur'
                                } </DataTable.Cell>
                                <DataTable.Cell numeric
                                textStyle={{
                                    color:'#FFE600',
                                    fontSize:18,

                                }}
                                >{nbrPoint} point</DataTable.Cell>
                            </DataTable.Row>)
                        })}
                     
                        </DataTable>

                </View>
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
