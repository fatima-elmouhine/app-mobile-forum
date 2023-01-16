import React from 'react'
import { Text, View, Pressable } from 'react-native';
import { Avatar} from 'react-native-paper';

export default function CardTheme({id, title, description, topics}) {
        return (
          <View style={{display:'flex', alignItems:'center', marginTop:30}}>
            <Pressable  onPress={()=>{
                console.log('bouton rediriger vers theme topic ')
            }}>
                <Avatar.Text size={80} style={{marginLeft:15, marginBottom:20, backgroundColor:'#caca'}} label={
                <Text >
                    {title}
                </Text>
                } />
    
            </Pressable>
            <Text style={{marginLeft:15, marginBottom:50, color:'white', fontWeight:'bold', fontSize:16}}>{title}</Text>
          </View>
            
  
              
        )
}
