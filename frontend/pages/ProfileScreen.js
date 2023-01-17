import * as React from 'react';
import { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text,Image, View, Pressable } from 'react-native';
import {useFonts,Roboto_400Regular,Roboto_400Regular_Italic} from "@expo-google-fonts/roboto";
import { TextInput, Avatar, IconButton, Snackbar } from 'react-native-paper';
import { LinearGradient } from "expo-linear-gradient";
import {putUser} from '../api/Users/putUser';
import { UserContext } from '../context/UserContext';


export default function ProfileScreen({navigation}) {
  const { userDetails, setUserDetails } = useContext(UserContext);


  const [firstname, setFirstname] = React.useState(userDetails.firstName);
  const [lastname, setLastname] = React.useState(userDetails.lastName);
  const [email, setEmail] = React.useState(userDetails.email)
  const [password, setPassword] = React.useState('');
  const [pressed, setPressed] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [colorMessage, setColorMessage] = React.useState('');

  
  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  async function handlePressCamera() {
    alert('Fonctionalité non disponible pour le moment ! Pour la V2 inshallah !');
  }
  async function handleSaveEdit() {
    var userInfo 

    if (firstname !== '' && lastname !== '' && email !== ''){
      if (password !== '') {
          userInfo = {
              id: userDetails.id,
              firstName: firstname,
              lastName: lastname,
              email: email,
              password: password

          }
      }else {
        userInfo = {
          id: userDetails.id,
          firstName: firstname,
          lastName: lastname,
          email: email,
        }

      }
      const response = await putUser( userInfo)


      if (response === 1062) {
        setMessage('Cet email est déjà utilisé');
        setColorMessage('rgb(186, 26, 26)');
      }else{

        setUserDetails({
          id: userDetails.id,
          email: userInfo.email,
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
        })
        setColorMessage('purple');
      setMessage('Vos informations ont bien été modifiées');
    }
    onToggleSnackBar(); 
  }else{
    var emptyField = [];
    if (firstname === '') {
      emptyField.push('Prénom');
    }
    if (lastname === '') {
      emptyField.push('Nom');
    }
    if (email === '') {
      emptyField.push('Email');
    }
    
    setMessage(`Veuillez remplir le${emptyField.length > 1 ? 's' : ''} champ${emptyField.length > 1 ? 's' : ''} suivant${emptyField.length > 1 ? 's' : ''} : ${emptyField.join(', ')}`);
    setColorMessage('rgb(186, 26, 26)');
    onToggleSnackBar();
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
        colors={['purple', '#02254F','#2D84EA']}
        style={styles.containerGradient}
        >
          <View style={[styles.profileImgContainer]}>
            <Avatar.Image size={150} source={require('../assets/img-test/image1.png')}   style={styles.image}/>
            <IconButton
              icon='camera'
              iconColor='#00FAAF'
              style={styles.icon}
              size={40}
              onPress={() => {handlePressCamera()}}
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
            <Pressable
                style={({ pressed }) => [{ backgroundColor: pressed ? '#50F4E1' : '#0160D0' }, styles.button ]}
  
                onPress={() => {
                    handleSaveEdit();
                }}
            >
                {({ pressed }) => (
                    <Text style={[{ color: pressed? 'black' :'white'}, styles.btnText]}>
                        Modifier
                    </Text>
                )}
            </Pressable>
          </View>
          <View style={styles.containerSnackBar}>
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
      </LinearGradient>
    </View>
  );
  }

  const styles = StyleSheet.create({
    bgTop: {
      backgroundSize: 'cover',
      borderWidth: 1,
      position: 'absolute',
      top: 10,
      height:150,
      zIndex: 1,
      width: '100%',
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
    },
    containerSnackBar: {
      flex: 1,
      justifyContent: 'space-between',
      marginBottom: 100,
    },

  });