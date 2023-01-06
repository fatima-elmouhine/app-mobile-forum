import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './pages/Home.js';
import Test from './pages/test.js';

export default function Index() {
    const navigation = useNavigation();
    const Stack = createStackNavigator();
  
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Test" component={Test} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}