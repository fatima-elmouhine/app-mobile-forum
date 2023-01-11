import * as React from 'react';
import { StyleSheet, Text,Image, View, ScrollView, ImageBackground, TouchableHighlight, Pressable } from 'react-native';
import {useFonts,Roboto_400Regular,Roboto_400Regular_Italic} from "@expo-google-fonts/roboto";
import { TextInput, Avatar, MD3Colors, IconButton, Button } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import CourseCardComponent from '../component/CourseCard/CourseCardComponent';
import {putUser} from '../api/Users/putUser';

export default function ProfileScreen({navigation}) {
//   const [text, setText] = React.useState({firstname: 'Janee',lastname:'Doe', email: 'janeeDoe@gmail.com', password: ''});
  const [firstname, setFirstname] = React.useState('Janee');
    const [lastname, setLastname] = React.useState('Doe');
    const [email, setEmail] = React.useState('janeeDoe@gmail.com')
    const [password, setPassword] = React.useState('');
  const [pressed, setPressed] = React.useState(false);
  React.useEffect( () => {

  }, [])
  async function handleSaveEdit() {

    if (password !== '') {
        console.log('password changed');
    }else {
        console.log('password not changed');
    }
    const userInfo = {
        id: 3,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password
    }

    try {
        const response = await putUser( userInfo)
        console.log(response);
        
    } catch (error) {
        console.log('ERROR DANS LE COMPONENT',error);
    }
  }

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_400Regular_Italic
  });


  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
      <LinearGradient
        colors={['#000000', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >
          <View style={[styles.profileImgContainer]}>
            <Avatar.Image size={150} source={require('../assets/img-test/image1.png')}   style={styles.image}/>
            <IconButton
              icon='camera'
              iconColor='#00FAAF'
              style={styles.icon}
              size={40}
              onPress={() => {handlePressEdit()}}
            />
            <Text style={styles.advise}>Change de photo</Text>
            <Text style={styles.title}>Profile</Text>
          </View>
          <View style={styles.form}>
                <TextInput
                label="Prenom"
                style={styles.input}
                value={firstname}
                onChangeText={text => setFirstname(text)}
                />
                <TextInput
                label="Nom"
                style={styles.input}
                value={lastname}
                onChangeText={text => setLastname(text)}
                />
                <TextInput
                label="Email"
                style={styles.input}
                value={email}
                onChangeText={text => setEmail(text)}
                />
                <TextInput
                label="password"
                style={styles.input}
                secureTextEntry={true}
                // value={text}
                onChangeText={text => setPassword(text)}
                />
            {/* </View> */}
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#50F4E1' : '#0160D0' }, styles.button ]}
  
                onPress={() => {
                    handleSaveEdit();
                }}
            >
                
            {/* </Button> */}
                {({ pressed }) => (
                    <Text style={[{ color: pressed? 'black' :'white'}, styles.btnText]}>
                        Modifier
                    </Text>
                )}
            </Pressable>
          </View>


      </LinearGradient>
    </View>
  );
  }

  const styles = StyleSheet.create({
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

    profileImgContainer: {
      zIndex: 4,
      top: 50,
      left: 28,
      position: 'relative',
    },

    image: {
      overflow: "hidden",
      borderWidth: 1,
      zIndex: 1,
      position: 'absolute',
      borderStyle: "dashed",
      borderColor: "#50F4E1",
 
    },
    icon: {
      zIndex: 2,
      position: 'absolute',
      top: 100,
      left: 110,
    },
    advise: {
        fontSize: 15,
        color: '#FFFFFF',
        // textAlign: 'center',
        marginTop: 150,
        marginLeft: 10,

    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: -40,
        marginLeft: 150,

    },
    form: {
        marginTop: 150,
        marginRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        textAlign: 'center',
        // display: 'flex',
    },
    input: {
        marginBottom: 20,
        width: 300,
        // borderRadius: 10,
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        // borderBottomRightRadius: 20,
        // borderBottomLeftRadius: 20,
    },
    button: {
        // backgroundColor: '#0160D0',
        borderRadius: 10, 
        marginTop: 20,
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
    }

  });