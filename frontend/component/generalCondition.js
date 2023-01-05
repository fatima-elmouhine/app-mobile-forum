import * as React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';

export default function GeneralCondition() {
  return (
    <View style={style.container}>
      <Text style={style.title}>GENERAL CONDITION</Text>
      <SafeAreaView style={style.safeare}>
        <ScrollView style={style.scrollview}>
          <Text style={style.paragraphe}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla

          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const style = StyleSheet.create({
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
    marginTop: 100,
  },
  safeare: {
    flex: 1,
    marginHorizontal: 50,
    marginVertical: 100,
    marginTop: 5,
  },
  scrollview: {
    flex: 1,
    marginTop: 20,
  },
  paragraphe: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
  },
});