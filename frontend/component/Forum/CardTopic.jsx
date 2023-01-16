import React from 'react'
import { Text, View} from 'react-native';
import { Card }  from 'react-native-paper';

export default function CardTopic({id, title, theme, messages}) {
        const numberMessage = messages.length
        return (
          <Card style={{marginBottom :10, margin:20}} onPress={()=> 
            messages[0]  && navigation.navigate('ForumDetailScreen',{id: messages[0].id_topic})}
            >
            <Card.Content style={{ flexDirection:"row", }}>
              <View style={{width:"70%", justifyContent:"center"}}>
                <Text variant="titleLarge">{theme}</Text>
                <Text variant="titleLarge">{title}</Text>
              </View>
              <View style={{alignItems: "flex-end", left: 0, }}>
                <Text variant="bodyMedium">Contient </Text>
                <Text variant="bodyMedium"> {numberMessage} message{numberMessage >0 &&'s'}</Text>
              </View>
            </Card.Content>
          </Card>
        )
}
