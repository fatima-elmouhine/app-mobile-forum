import React from 'react'
import { Text, View} from 'react-native';
import {  List} from 'react-native-paper';

import {  formatDistance } from 'date-fns'
import { fr } from 'date-fns/locale'

export default function CardMessage({ text, topic, theme, createdAt}) {
    // const CardMessage = () => {
      console.log(new Date(createdAt))
        return (
          <View style={{display:'flex'}} >
          <List.Item
          style={{backgroundColor:'white', marginBottom:30, marginHorizontal:20, borderRadius:10, padding:10, }}
          title={ theme}
          description={
            <>
              <Text style={{fontWeight : 'bold'}}>
                {topic}  {'\n'}
              </Text>
              <Text>
                {text}
              </Text>
            </>
            
          }
          right={() => 
            <Text style={{color:'grey', fontSize:12, alignSelf:'flex-start'}}>
              {formatDistance(new Date(createdAt), Date.now(), { addSuffix: true , locale: fr })}
            </Text>
          }
          descriptionNumberOfLines={4}
          />
          </View>
        )
    //   }
}
