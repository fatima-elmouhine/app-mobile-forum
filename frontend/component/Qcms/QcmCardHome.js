import React from 'react'
import { Text, View} from 'react-native';
import { Card }  from 'react-native-paper';


export default function QcmCard({qcm,navigation}) {
    const themeColor = {
        1: "#EEA923",
        2: "#3AC49A",
        3: "#FF69B4",
        4: "#9DC726",
        5: "#DB7093",
        6: "#C71585",
        7: "#DA70D6",
      };

  var numberQuestion = qcm.Questions?.length
  numberQuestion = numberQuestion == undefined ?  0 :  numberQuestion
  return (
    <Card style={{marginBottom :10, margin:20, 
        borderRadius:8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        backgroundColor: themeColor[qcm?.Questions && qcm?.Questions[0]?.id_theme],
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        display:'flex',
        flexDirection:'column',

        justifyContent:'center',
        alignItems:'center',
        marginLeft:50,
        marginRight:50,

    }} onPress={()=> 
      navigation.navigate('QuestionQcmScreen', {idQcm:qcm.id})}
      >
      <Card.Content style={{ flexDirection:"row",
      
    }}>
        <View style={{ justifyContent:"center",width:'100%'}}>
            <Text style={{fontSize:25,color:'white' ,fontWeight:'bold'}}>#{qcm.id} QCM</Text>
            <Text style={{fontSize:25 ,color:'white' ,fontWeight:'bold'}}>{numberQuestion} question{numberQuestion>0&&'s'}</Text>
            <Text style={{fontSize:25 ,color:'white' ,fontWeight:'bold'}}>{qcm.title.toUpperCase()}</Text>
        </View> 
      </Card.Content>
    </Card>
  )
}
