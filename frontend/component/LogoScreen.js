import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function LogoScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0075FF']}
        style={styles.linear}
      >
        <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
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
  linear: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 50,
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
