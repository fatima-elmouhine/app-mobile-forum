import * as React from 'react';
import { StyleSheet, Text,Image, View, ScrollView, ImageBackground, TouchableHighlight, Pressable, Keyboard } from 'react-native';
import {useFonts,Roboto_400Regular,Roboto_400Regular_Italic} from "@expo-google-fonts/roboto";
import { List,TextInput, Portal, Modal, IconButton, Button, Provider, Snackbar } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import MessageCardComponent from '../component/TopicMessageCard/MessageCardComponent';

import {getTopic} from '../api/Forum/getTopic';

export default function ForumDetailScreen({route,navigation}, ) {
    // console.log('id = ',route.params.id);

    const [topic, setTopic] = React.useState();
    const [messageModal, setMessageModal] = React.useState("");
    const [pressed, setPressed] = React.useState(false);
    const [visible, setVisible] = React.useState(false);
    const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
  
    const onDismissSnackBar = () => setVisible(false);
    // console.log('visible = ',messageModal);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'pink', padding: 30,margin: 20, height: 600, marginTop: 700};

    React.useEffect( () => {
     
        const getTopicInForumDetail = async () => {
            const topicReq = await getTopic(route.params.id);
            setTopic(topicReq);
            
    }
    getTopicInForumDetail();

  }, [])

//   console.log('TOPICCC = ',topic[0].Topic.title);


  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic
  });

  function handlePressPopup() {
    // setPressed(!pressed);
    showModal();
    // console.log('pressed = ',pressed);
  }

  function handlePostMessageInTopic(){
    console.log('messageModal = ',messageModal);
    hideModal();
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
                    {topic && topic[0]?.Topic.title}
                </Text>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:20}}>
                    <Provider>
                        <Portal>
                            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                <Text style={{fontSize:20, marginBottom:90}}>Apporter vous aussi votre piere à l'édifice !</Text>
                                
                                <TextInput multiline={true} label="Message" mode='outlined' style={{margin:10, height:100 }}
                                    // onTextInput={true}
                                    value={messageModal}
                                    onSubmitEditing={Keyboard.dismiss}
                                    // autoFocus={true}
                                    onChangeText={text => setMessageModal(text)}
            
                                />
                                <Button icon='send' onPress={()=>{
                                    handlePostMessageInTopic();
                                }} mode='contained-tonal' style={{}}>
                                        Envoyer
                                </Button>
                            </Modal>
                        </Portal>
                        <Button icon='plus' onPress={()=>{
                            handlePressPopup();
                        }} mode='contained-tonal' style={{}}>
                                Laisser un message
                        </Button> 
                    </Provider>
                </View>
                <View style={[styles.messagesContainer]}>
                    {topic && topic.map((message) => {
                        return (
                            <MessageCardComponent message={message}/>
                            // console.log('message = ',message)
                        )}
                    )}
                    {topic && topic.map((message) => {
                        return (
                            <MessageCardComponent message={message}/>
                            // console.log('message = ',message)
                        )}
                    )}
                    {topic && topic.map((message) => {
                        return (
                            <MessageCardComponent message={message}/>
                            // console.log('message = ',message)
                        )}
                    )}
                </View>

            </ScrollView>
            <Snackbar
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            // Do something
          },
        }}>
        Hey there! I'm a Snackbar.
      </Snackbar>

      </LinearGradient>
    </View>
  );
  }

  const styles =  StyleSheet.create({
    bgTop: {
      backgroundSize: 'cover',
      borderWidth: 1,
      // borderColor: 'red',
      position: 'absolute',
      top: 10,
      height:150,
      zIndex: 1,
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
      fontFamily: "Roboto_400Regular",
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
      fontFamily: "Roboto_400Regular",
      paddingLeft: 28,
      margin: 0,
    },
    messagesContainer: {
        marginTop: 70,
        // display: 'flex',
    },


  });