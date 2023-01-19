import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import { userAuthentication } from '../api/Users/authentication';
import { UserContext } from '../context/UserContext';

import * as SecureStore from 'expo-secure-store'

function LoginScreen({ navigation }) {

  const { userAuthentication } = useContext(UserContext);

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if (token) {
        navigation.navigate('HomeLoggedScreen');
      }
    });   
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await userAuthentication(email, password);
      Alert.alert('Success', 'You are connected');
      navigation.navigate('HomeLoggedScreen');
    } catch (error) {
      if (error.response.status === 403) {
        Alert.alert('Oops', 'Mot de passe incorrect');
      } else if (error.response.status === 404) {
        Alert.alert('Oops', 'L\'utilisateur n\'a pas été trouvé');
      } else if (error.response.status === 400) {
        Alert.alert('Oops', 'Tous les champs doivent etre remplis');
      } else {
        Alert.alert('Oops', 'Erreur lors de la connexion de l\'utilisateur');
      }
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0075FF']}
        style={styles.linear}
      >
        <Image source={require('../assets/logo_fond.png')} style={styles.bgTop} />
        <Text style={styles.title}>Login</Text>
        <SafeAreaView style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.button_text}>Login</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  bgTop: {
    backgroundSize: 'cover',
    borderWidth: 1,
    position: 'absolute',
    top: 10,
    height:150,
    zIndex: 1,
    width: '100%',
  },
  linear: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    color: '#fff',
  },
  form: {
    width: '100%',
    padding: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 250,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    width: 150,
    borderRadius: 5,
    backgroundColor: '#0075FF',
  },
  button_text: {
    color: '#fff',
    textAlign: 'center',
  },
});