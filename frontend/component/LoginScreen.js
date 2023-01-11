import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {userAuthentication} from '../api/Users/authentication';

function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    const response = await userAuthentication(email, password);
    console.log('front', response);
    if (typeof response !== 'object') {
      console.log('Login successful');
      <Alert title="Login successful" />
      navigation.navigate('HomeLoggedScreen');
    } else {
      console.log('Login failed');
      <Alert title="Login failed" />
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