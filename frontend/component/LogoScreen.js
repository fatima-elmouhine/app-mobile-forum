import * as React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import style from '../css/Background.module.css';

function LogoScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0075FF']}
        style={styles.linear}
      >
        <ImageBackground source={require('../assets/logo_fond.png')} resizeMode="cover" style={styles.image_fond}/>
          <Image source={require('../assets/logoMed.png')} style={styles.image}/>
          <Text style={styles.paragraphe}>Testez vos connaissances en un swipe</Text>
      </LinearGradient>
    </View>
  );
}

export default LogoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  linear: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_fond: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  image: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraphe: {
    color: '#fff',
    fontSize: 20,
    marginTop: 70,
  },
});
