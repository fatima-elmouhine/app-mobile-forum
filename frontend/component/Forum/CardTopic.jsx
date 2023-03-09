import React from 'react'
import { Text, View} from 'react-native';
import { Card }  from 'react-native-paper';
import { getTopic } from '../../api/Forum/getTopic';

export default function CardTopic({idTopic, title, theme, messages, navigation}) {
  const [topic, setTopic] = React.useState();
  const getTopicInForumDetail = async () => {
    const topicReq = await getTopic(idTopic);
    console.log(topicReq.length)
    setTopic(topicReq);
  }

  React.useEffect(() => {
    console.log('useEffect')
    getTopicInForumDetail();
  }, []);


  return (
    <Card style={{marginBottom :10, margin:20}} onPress={()=> 
      navigation.navigate('ForumDetailScreen',{id: idTopic, title:title})}
      >
      <Card.Content style={{ flexDirection:"row", }}>
        <View style={{width:"70%", justifyContent:"center"}}>
          <Text variant="titleLarge">{theme}</Text>
          <Text variant="titleLarge">{title}</Text>
        </View>
        <View style={{alignItems: "flex-end", left: 0, }}>
          <Text variant="bodyMedium">Contient </Text>
          <Text variant="bodyMedium"> {topic?.length ? topic.length : 0} message{topic?.length > 1 &&'s'}</Text>
        </View>
      </Card.Content>
    </Card>
  )
}
