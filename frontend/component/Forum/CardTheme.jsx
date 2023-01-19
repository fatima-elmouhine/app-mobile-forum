import React from 'react'
import { Text, View, Pressable } from 'react-native';
import { Avatar, Button} from 'react-native-paper';

export default function CardTheme({id, title, description, navigation, num, key}) {

  const themeInfo = {
    id: id,
    title: title,
    description: description
  }



  function chooseTheme() {
    navigation.navigate('SectionChoiceScreen', themeInfo)
  }

        return (
          <View style={{display:'flex', alignItems:'center', marginTop:30}}>
            <Pressable  onPress={chooseTheme}>
                <Avatar.Text size={num ? 120 : 80} style={{marginLeft:15, marginBottom:20, backgroundColor:'#caca'}} label={
                <Text >
                    {title}
                </Text>
                } />
    
            </Pressable>
            <Text style={{marginLeft:15, marginBottom:50, color:'white', fontWeight:'bold', fontSize:16}}>{title}</Text>
          </View>
            
  
              
        )
}
