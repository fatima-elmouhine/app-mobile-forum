import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import LogoScreen from './component/LogoScreen';
import GeneralConditionScreen from './component/GeneralConditionScreen';
import LoginScreen from './component/LoginScreen';
import PaginationSliderScreen from './component/PaginationSliderScreen';
import HomeLoggedScreen from './pages/HomeLoggedScreen.js';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="HomeLoggedScreen" component={HomeLoggedScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;