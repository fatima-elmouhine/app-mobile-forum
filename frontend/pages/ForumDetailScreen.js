import * as React from 'react';
import { StyleSheet, Text,Image, View, ScrollView, Modal, TouchableHighlight, Pressable, Keyboard } from 'react-native';
import { List,TextInput, Portal, IconButton, Button, Provider, Snackbar } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import MessageCardComponent from '../component/TopicMessageCard/MessageCardComponent';
import PopUpPostMessage from '../component/Forum/PopUpPostMessage';
import {getTopic} from '../api/Forum/getTopic';

export default function ForumDetailScreen({route,navigation}, ) {
    const title = route.params.title
    const [topic, setTopic] = React.useState();
    const [messageModal, setMessageModal] = React.useState("");
    const [visible, setVisible] = React.useState(false);

  
    const onDismissSnackBar = () => setVisible(false);

    const getTopicInForumDetail = async () => {
      const topicReq = await getTopic(route.params.id);
      console.log('topicReq')
      
      setTopic(topicReq);
      
    }


    React.useEffect( () => {
      
      if(route.params.id){

        getTopicInForumDetail();
        // console.log('topic', topic)
      }

  }, [])


  React.useEffect( () => {
    if(route.params.id){
      getTopicInForumDetail()
    }

  }, [visible])

  function handlePostMessageSnackBar(value){
    setVisible(value);
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
      <LinearGradient
        colors={['purple', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >
            <ScrollView stickyHeaderIndices={[1]} style={{flex:1, flexDirection:'column', margin:10, marginTop:40}}>
                <Text style={{fontSize:30, fontWeight:'bold',color:'white', marginTop:50}}>
                    {title}
                </Text>

                <PopUpPostMessage topicID={route.params.id} handlePostMessageSnackBar={handlePostMessageSnackBar}/>

                <View style={styles.messagesContainer}>
                    {topic !== "Aucun message n'a été trouvé" ? 
                    topic?.map((message) => {
                        return (
                            <MessageCardComponent key={message.id} message={message}/>
                        )}
                    )
                    : <Text 
                        style={{
                          fontSize: 19,
                          color: "white",
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontWeight: "bold",
                        }}
                      > 
                        {topic} 
                      </Text>
                  }
                </View>

            </ScrollView>
            <View>
              <Snackbar
                visible={visible}
                style={{backgroundColor: 'purple', marginRight:20, marginBottom:100}}
                onDismiss={onDismissSnackBar}
                action={{
                  label: 'X',
                  onPress: () => {
                    // Do something
                  },
                }}>
                Votre message a bien été posté
              </Snackbar>
          </View>

      </LinearGradient>
    </View>
  );
  }

  const styles =  StyleSheet.create({
    bgTop: {
      backgroundSize: 'cover',
      borderWidth: 1,
      position: 'absolute',
      top: 10,
      height:150,
      // zIndex: 1,
      width: '100%',
      // backgroundPosition: 'bottom',
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      backgroundImage: "url(../assets/img-test/image1.png)",
    },
    container: {
      // flex: 6,
      width: '100%',
      height: '100%',
      display: 'flex',
      // paddingLeft: 28,
      margin: 0,

      // alignItems: 'center',
      // justifyContent: 'center',
    },
    containerGradient: {
      // flex: 6,
      width: '100%',
      height: '100%',
      display: 'flex',
      paddingLeft: 28,
      margin: 0,
    },
    messagesContainer: {
        marginTop: 70,
        // display: 'flex',
    },


  });