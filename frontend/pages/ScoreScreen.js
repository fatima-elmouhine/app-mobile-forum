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
import {playQcmUser } from "../api/Qcms/playQcmUser";

export default function ScoreScreen({ route, navigation }) {
  // remettre le bouton suivant
  // vider les variables une fois la partie fini

    const qcmId = route.params.idQcm
    const nbrQuestion = route.params.qcmQuestion.length
    const answersUser = route.params.answersChecked
    const textInputValue = route.params.textInputValue

    const goodAnswer  = route.params.goodAnswer
    const [scoreEnd, setScoreEnd] = useState(0)
    var scoreTotal = nbrQuestion
    const letterArray = ['A', 'B', 'C', 'D', 'E']

    var errorsArray = []

    function filterGoodAnswersUser(){
        var arrayAnswersUser = []
        for (var element in answersUser) {
           for(var [key, value] of Object.entries(answersUser[element])){
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

        // if(array2.length == 0){
        //     count = 3
        // }

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

    function calculScoreTotal(){
        var scoreStart = 0
        
        var arrayBadAnswerId = []
        for(var i = 0; i < errorsArray.length; i++){
            scoreStart += errorsArray[i].score
        }
        const score = parseFloat(scoreStart).toFixed(1) % 1 

        let partieDecimale = score % 1;
        let decimales = Math.floor(partieDecimale * 10);
        let index = 1
        if(decimales == 0){
            index = 0
        }
        setScoreEnd(parseFloat(scoreStart).toFixed(index))
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
        if( errorsArray.length !== 0){
            playQcmUser(qcmId, answersUser, textInputValue, errorsArray)
        }
    }, [])
    

    const userAnswer = filterGoodAnswersUser()


//  useEffect(() => {
    for (const [key, value] of Object.entries(userAnswer)) {

        goodAnswer.forEach((element, i) => {
            var correctionAnswer = element
            var id = element.questionId
            if(value.questionId == element.questionId){
                let differences = countDifferences(correctionAnswer.letter, value.letter, id)
                // console.log('value.letter',value.letter)
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
                // calculScoreTotal()

                // console.log(errorsArray)

        
            

            }
        });
    }

    // }, [errorsArray])


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
                    display:'flex',
                    justifyContent:'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        color: "white",
                        marginLeft:35,
                        marginTop: 20,
                        fontWeight:'bold',
                      
                    }}
                >
                    Vos résultats :
                </Text>
                <View style={{
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

                            var msgError = ''
                            switch(nbrErrorFound){
                                case 0:
                                    msgError = 'pas d\'erreur'
                                    break;
                                case 1:
                                    msgError = '1 erreur'
                                    break;
                                case (2 || 3 || 4 || 5) :
                                    console.log('ok')
                                    msgError = nbrErrorFound +' erreurs'
                                    break;
                                default:
                                    msgError = '0 reponse'
                                    break;
                            }
                            console.log(nbrErrorFound)
                            
                            const nbrPoint = returnScore(answer[0])
                            console.log(answer[0], nbrPoint)
                            
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

                                 }}>
                                    {msgError} 
                                </DataTable.Cell>
                                <DataTable.Cell numeric
                                textStyle={{
                                    color:'#FFE600',
                                    fontSize:18,

                                }}
                                >{nbrPoint  || 0} point</DataTable.Cell>
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


});
