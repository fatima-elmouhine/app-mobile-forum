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
// import Radar from 'paths-js/radar';
// import { Radar } from './Radar.js'
// import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import {
  ProgressBar,
  Avatar,
  MD3Colors,
  Checkbox,
  Button,
  DataTable
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

function UserResultComponent(){
        let data = [{
          "speed": 74,
          "balance": 29,
          "explosives": 40,
          "energy": 40,
          "flexibility": 30,
          "agility": 25,
          "endurance": 44
        }]
      
        let options = {
          width: 290,
          height: 290,
          margin: {
            top: 20,
            left: 20,
            right: 30,
            bottom: 20
          },
          r: 150,
          max: 100,
          fill: "#2980B9",
          stroke: "#2980B9",
          animate: {
            type: 'oneByOne',
            duration: 200
          },
          label: {
            fontFamily: 'Arial',
            fontSize: 14,
            fontWeight: true,
            fill: '#34495E'
          }
        }
      
        return (
          <View>
            {/* <Radar data={data} options={options} /> */}
          </View>
        )
}

function ClassementComponent(){
    return(

        <View style={{
        }}>
            <Text style={{fontSize:20, color:'white', marginTop:10, marginLeft:40, fontWeight:'bold',display:'flex',
            alignSelf:'flex-start', width:'100%'

                }}>
                Classement
            </Text>
        </View>

    )
    
}
export default function StatsScreen({ route, navigation }) {
 
    const [selected, setSelected] = useState("result");
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

            <Text style={{fontSize:32, color:'white', marginTop:10, marginLeft:40, fontWeight:'bold',display:'flex',
                alignSelf:'flex-start', width:'100%'
                 }}>
                Statistiques
            </Text>

            <View style={{
                display:'flex',
                flexDirection:'row',
                alignItems:'center',
                justifyContent:'center',
                marginTop:20,
                width:'100%',
            }}>
                <TouchableOpacity 
                onPress={() => setSelected('result')}
                style={{
                    backgroundColor:'#052346',
                    padding:10,
                    paddingHorizontal:40,
                    paddingBottom:20,
                    borderRadius:10,
                    borderWidth:3,
                    borderColor: selected == 'result' ? 'white' : 'transparent',

                    
                }}>
                    <Text style={{fontSize:20, color:'white', marginTop:10, fontWeight:'bold'
                        }}>
                        Mes resultats
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => setSelected('classement')}
                
                style={{
                    backgroundColor:'#771182',
                    padding:10,
                    paddingHorizontal:40,
                    paddingBottom:20,
                    borderRadius:10,
                    marginLeft:10,
                    borderWidth:3,
                    borderColor: selected == 'classement' ? 'white' : 'transparent',
                }}>
                    <Text style={{fontSize:20, color:'white', marginTop:10,fontWeight:'bold'
                        }}>
                        Classement
                    </Text>
                </TouchableOpacity>
            </View>
{
    selected == 'result' ?
    <UserResultComponent/>
    :
    <ClassementComponent/>

}

                

                

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
