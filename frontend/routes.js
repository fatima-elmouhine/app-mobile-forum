import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';

const Stack = createStackNavigator();

function Routes() {  
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='HomeScreen'>
                <Stack.Screen options={{title: '', headerShown: false}} name="HomeScreen" component={HomeScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;