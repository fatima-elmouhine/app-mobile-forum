import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

function LogoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MED EN PHARMA KINE</Text>
      <Image source={require('../assets/BMW-Logo-1923-1953.webp')} style={styles.image}/>
      <Text style={styles.paragraphe}>L'avenir à portée de main</Text>
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
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  paragraphe: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
});
