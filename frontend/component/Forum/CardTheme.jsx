import React from 'react'
import { Text, View, Pressable } from 'react-native';
import { Avatar} from 'react-native-paper';

export default function CardTheme({id, title, description, navigation, num}) {

  const themeInfo = {
    id: id,
    title: title,
    description: description
  }



  function chooseTheme() {
    if(num){
     return navigation.navigate('SectionChoiceScreen', themeInfo)
    }else{
      return navigation.navigate('SearchByThemeScreen', {title:title, id:id, type: 'topic'})
    }
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
