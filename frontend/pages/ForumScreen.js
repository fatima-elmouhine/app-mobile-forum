import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';



const App = ({ navigation }) => {

  const CardTest = ({id, title, description}) => {
    
      return (
        <Card style={{marginBottom :10}}>
          <Card.Content style={{ flexDirection:"row"}}>
            <View style={{width:"30%", justifyContent:"center"}}>
              <Text variant="titleLarge">{title}</Text>
            </View>
            <View style={{alignItems: "flex-end", left: 0, width:"70%"}}>
              <Text variant="bodyMedium">Les derniers messages : </Text>
              <Text variant="bodyMedium">Message 1</Text>
              <Text variant="bodyMedium">Message 2</Text>
              <Text variant="bodyMedium">Message 2</Text>
            </View>
          </Card.Content>
        </Card>
      )
  }

  const DATA = [
    {
      id: "1",
      title: "Thème 1",
      description: "Ceci est la descritpion du thème"
    },
    {
      id: "2",
      title: "Thème 2",
      description: "Ceci est la descritpion du thème"
    },
    {
      id: "3",
      title: "Thème 2",
      description: "Ceci est la descritpion du thème"
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1,padding:10, backgroundColor:"red" }}>
        <Searchbar
        style= {{borderRadius:30, width: "100%"}}
        placeholder="Rechercher un sujet"
        icon="filter"
        onIconPress={() => console.log('Pressed filter')}
        // onChangeText={onChangeSearch}
        // value={searchQuery}
        />
        <View style={{backgroundColor:"blue", height:"100%", top: 50}}>
          <ScrollView>
            {DATA.map((item) => {
              return (
                <CardTest key={item.id} title={item.title} description={item.description} />
              )
            })}
          </ScrollView>
        </View>
    </SafeAreaView>
  );
};
  
export default App;