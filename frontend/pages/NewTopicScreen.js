import * as React from "react";
import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  ImageBackground,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,

} from "react-native";
import { useEffect, useContext, useState } from "react";
import {
  ProgressBar,
  Avatar,
  MD3Colors,
  IconButton,
  Button,
  RadioButton,
  TextInput,
  Snackbar
} from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import SelectDropdown from 'react-native-select-dropdown'
import { getThemes } from "../api/Themes/getThemes";
import { postMessageInTopic } from '../api/Forum/postMessageInTopic';
import {postTopic} from '../api/Forum/postTopic';

export default function NewTopicScreen({ navigation }) {

    const [themes, setThemes] = useState();
    const [selectedTheme, setSelectedTheme] = useState();
    const [titleTopic, setTitleTopic] = useState();
    const [messageTopic, setMessageTopic] = useState();
    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [colorMessage, setColorMessage] = React.useState('');

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);
  
    async function fetchThemes() {
        const themes = await getThemes();
        setThemes(themes);
    }
    useEffect(() => {
        fetchThemes()
    }, []);

    async function postTopicAndMessage() {

        console.log(selectedTheme, titleTopic, messageTopic);
        if (selectedTheme === undefined && titleTopic === undefined && messageTopic === undefined) {
            setMessage('Veuillez remplir tous les champs');
            setColorMessage('red');
            onToggleSnackBar();
            return
        }else{
            if (selectedTheme === undefined || titleTopic === undefined || messageTopic === undefined) {
            var emptyField = [];
            if (selectedTheme === undefined) {
              emptyField.push('Thème');
            }
            if (titleTopic === undefined) {
              emptyField.push('Titre du sujet');
            }
            if (messageTopic === undefined) {
                emptyField.push('Message');
            }

            setMessage(`Veuillez remplir le${emptyField.length > 1 ? 's' : ''} champ${emptyField.length > 1 ? 's' : ''} suivant${emptyField.length > 1 ? 's' : ''} : ${emptyField.join(', ')}`);
            setColorMessage('rgb(186, 26, 26)');
            onToggleSnackBar();
            }else{
                const topic = await postTopic(selectedTheme, titleTopic);
                console.log(topic);
                if (topic.data.id) {
                    await postMessageInTopic(topic.data.id, messageTopic);
                    navigation.navigate('ForumDetailScreen',{id: topic.data.id, title:topic.data.title});
                }

            }
        }
        
    }

 

    return (
        <SafeAreaView style={styles.container}>
        <LinearGradient
            colors={["purple", "#02254F", "#2D84EA"]}
            style={styles.containerGradient}
        >
            <Image
            source={require("../assets/logo_fond.png")}
            style={styles.bgTop}
            />
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="margin" enabled   keyboardVerticalOffset={10}>
                <Text style={{fontSize:40, color:'white', marginTop:160, marginLeft:40, fontWeight:'bold'}}>
                    Nouveau
                </Text>
                <View 
                    style={(visible) => [{ display: visible ? 'flex' : 'none' }, styles.containerSnackBar ]}
                    // style={styles.containerSnackBar}
                    >
                <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                style={{
                    backgroundColor:colorMessage,
                    fontSize: 130
                }}
                action={{
                    label: 'X',
                    onPress: () => {
                    onDismissSnackBar()
                    },
                }}>
                {message}
                </Snackbar>
                </View>
                <View style={{flexDirection:'row', marginTop:0, marginBottom:200,  display:'flex', flexDirection:'column', alignItems:"center"}}>
                    <View style={{borderRadius:8, flexDirection:'row', marginTop:20,  display:'flex', flexDirection:'column', backgroundColor:'transparent',padding:40,margin:20}}>

                        <Text style={{color:'white', fontSize:17, marginBottom:15 }}>
                            Thème
                        </Text>

                        <SelectDropdown
                            data={themes}
                            onSelect={(selectedItem, index) => {
                                setSelectedTheme(selectedItem.id);
                                console.log(selectedItem, index)
                            }}
                            defaultButtonText={"Choissisez un theme "}
                            buttonTextStyle={{fontSize: 18, color: 'black', textAlign:'left',}}
                            buttonStyle={{borderRadius:8,width:'100%', marginBottom:30 }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                // text represented after item is selected
                                // if data array is an array of objects then return selectedItem.property to render after item is selected
                                return selectedItem.title
                            }}
                            rowTextForSelection={(item, index) => {
                                // text represented for each item in dropdown
                                // if data array is an array of objects then return item.property to represent item in dropdown
                                return item.title
                            }}
                        />

                        <Text style={{color:'white', fontSize:17, marginBottom:4 }}>
                            Titre du sujet
                        </Text>
                        <TextInput
                            underlineStyle={{backgroundColor:'transparent'}}
                            style={{ backgroundColor: "white", width: 300, height: 50, marginTop: 20,borderRadius:8,marginBottom:30 }}
                            value={titleTopic}
                            onChangeText={text => setTitleTopic(text)}
                            />
                        <Text style={{color:'white', fontSize:17, marginBottom:4 }}>
                            Message
                        </Text>

                        <TextInput
                        multiline={true}
                        numberOfLines={4}
                        underlineStyle={{backgroundColor:'transparent'}}
                        style={{ backgroundColor: "white", width: 300, padding: 10, marginTop: 20,borderRadius:8 }}
                        value={messageTopic}
                        onChangeText={text => setMessageTopic(text)}
                        />
                    </View>
                    <Pressable
                        style={({ pressed }) => [{ backgroundColor: pressed ? '#EEA923' : '#851D99' }, styles.button ]}
                        
                        onPress={() => {
                            postTopicAndMessage();
                            console.log('pressed')
                        }}
                        >
                        {({ pressed }) => (
                            <Text style={[{ color: pressed? 'black' :'white'}, styles.btnText]}>
                                Publier
                            </Text>
                        )}
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
            <Image
            source={require("../assets/logo_fond2.png")}
            style={styles.bgBottom}
            />
        </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  bgTop: {
    backgroundSize: "cover",
    borderWidth: 1,
    // borderColor: 'red',
    position: "absolute",
    height: 150,
    width: "100%",
    // backgroundPosition: 'bottom',
  },
  bgBottom: {
    backgroundSize: "cover",
    borderWidth: 1,
    // borderColor: 'red',
    position: "absolute",
    bottom: 0,
    height: 150,
    // transform: [{ rotate: "180deg" }],
    width: "100%",
    zIndex: -1,
    // backgroundPosition: 'bottom',
  },

  linearGradient: {
    flex: 1,
    backgroundImage: "url(../assets/img-test/image1.png)",
  },

  container: {
    // flex: 6,
    width: "100%",
    height: "100%",
    // paddingLeft: 28,
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  containerGradient: {
    // flex: 6,
    width: "100%",
    height: "100%",
  },

  profileImgContainer: {
    marginHorizontal: 16,
    marginTop: 50,
    justifyContent: "space-between",
    marginBottom: 64,
  },

  image: {
    overflow: "hidden",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#50F4E1",
  },

  containerText: {},

  name: {
    fontSize: 20,
    color: "#fff",
  },

  paragraphe: {
    fontSize: 15,
    color: "#fff",
  },

  progress: {
    width: 150,
    height: 20,
    borderRadius: 10,
  },

  sectionTitle: {
    fontSize: 20,
    marginHorizontal: 16,
    color: "#fff",
    marginBottom: 24,
  },
  button: {
    // backgroundColor: '#0160D0',
    borderRadius: 10, 
    // marginTop: 20,
    width: 144,
    height: 49,
    borderRadius: 12,
    display: 'flex',
    justifyContent: 'center',
    // fontSize: 20,
    }
    ,
    btnText: {
        fontSize: 20,
        textAlign: 'center',
    },
    containerSnackBar: {
        flex: 1,
        justifyContent: 'space-between',
        // marginTop: 300,
        // display: 'none',
      },
});
