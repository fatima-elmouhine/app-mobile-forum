import React, {useEffect, useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { List,TextInput, Portal, IconButton, Button, Provider, Snackbar } from 'react-native-paper';
import { postMessageInTopic } from '../../api/Forum/postMessageInTopic';
const PopUpPostMessage = (props) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [snackBarShowed, setSnackBarShowed] = useState({
    visible: false,
    isMessageSent: false,
  });
  const [messageModal, setMessageModal] = React.useState("");

    useEffect(() => {
        props.handlePostMessageSnackBar(snackBarShowed.visible)

    }, [snackBarShowed.visible])

  async function handlePostMessageInTopic(){
    const response = await postMessageInTopic(props.topicID, messageModal)
    setModalVisible(!modalVisible)
    if(response.status === 201){
        setSnackBarShowed({
            visible: !snackBarShowed.visible,
        })
    }

    setMessageModal("")
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Exprimez-vous !</Text>
            <View style={{display:'flex', flexDirection:'column', justifyContent:'space-between', width:'100%'}}>
                <TextInput multiline={true} label="Message" mode='outlined' style={{margin:10, height:100, width:300 }}
                    value={messageModal}
                    onChangeText={text => setMessageModal(text)}
                />

            </View>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() =>{                
                    setModalVisible(!modalVisible)}
            }
                >
                <Text style={styles.textStyle}>❌ Fermer</Text>
                </Pressable>
                <Button 
                    icon='send' 
                    mode='contained-tonal' 
                    style={{ marginLeft:10, backgroundColor:'#FFC107', color:'black'}}
                    onPress={()=>{
       
                        handlePostMessageInTopic();
                    }} >
                            Envoyer
                </Button>
            </View>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
            setSnackBarShowed({
                visible: false,
                isMessageSent: false,
            })
            setModalVisible(true)}}>
        <Text style={styles.textStyle}>Laissez un commentaire</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgb(233, 224, 228)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#ddb100',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PopUpPostMessage;