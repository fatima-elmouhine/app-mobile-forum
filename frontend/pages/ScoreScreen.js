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

    console.log(route.params)
   

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
                            {/* {title} */}
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
                        QCM Anatomie
                    </Text>
                    <Text
                        style={{
                            fontSize: 20,
                            color: "white",
                            marginLeft: 10,
                            marginTop: 20,
                            // textAlign: "center",
                            // marginTop: 50,
                            }}
                    >
                        5 questions
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
                    2,7/5
                </Text>
            </View>

            <View style={{
                width:'100%',
                display:'flex',
                alignItems:'center',
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
                    Vos réponses :
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

                            <DataTable.Row>
                                <DataTable.Cell 
                                    textStyle={{
                                        color:'#FF00B8',
                                        fontSize:20,
                                        fontWeight:'bold',

                                    }}>Question 1</DataTable.Cell>
                                <DataTable.Cell numeric 
                                textStyle={{
                                    color:'#FDB2FF',
                                    fontSize:20,

                                }}>0 erreur</DataTable.Cell>
                                <DataTable.Cell numeric
                                textStyle={{
                                    color:'#FFE600',
                                    fontSize:20,

                                }}
                                >1 point</DataTable.Cell>
                            </DataTable.Row>

                            <DataTable.Row>
                                <DataTable.Cell 
                                    textStyle={{
                                        color:'#FF00B8',
                                        fontSize:20,
                                        fontWeight:'bold',

                                    }}
                                >
                                    Question 2
                                </DataTable.Cell>
                                <DataTable.Cell numeric
                                textStyle={{
                                    color:'#FDB2FF',
                                    fontSize:20,

                                }}
                                >1 erreur</DataTable.Cell>
                                <DataTable.Cell numeric
                                textStyle={{
                                    color:'#FFE600',
                                    fontSize:20,

                                }}
                                >0,5 point</DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>

                </View>
            </View>

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
