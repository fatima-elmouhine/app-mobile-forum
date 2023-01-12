import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

function GeneralConditionScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#000000', '#0075FF']}
        style={styles.linear}
      >
        <Image source={require('../assets/logo_fond.png')} style={styles.bgTop}/>
        <SafeAreaView style={styles.safeare}>
          <ScrollView style={styles.scrollview}>
            <Text style={styles.title}>Condition Générale</Text>
            <Text style={styles.paragraphe}>
            Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. 
            Etiam iaculis nunc ac metus. Ut id nisl quis enim dignissim sagittis.
            Suspendisse pulvinar, augue ac venenatis condimentum, 
            sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Etiam rhoncus.
            </Text>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

export default GeneralConditionScreen;

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
  title: {
    fontSize: 30,
    // fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#fff',
    marginBottom: 42,
  },
  safeare: {
    flex: 1,
    marginHorizontal: 50,
    marginVertical: 100,
    marginTop: 42,
  },
  scrollview: {
    flex: 1,
    marginTop: 150,

  },
  paragraphe: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#50F4E1',
    borderRadius: 35,
    padding: 30,
  },
});