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
import ProfileScreen from './pages/ProfileScreen.js';
import ForumDetailScreen from './pages/ForumDetailScreen.js';
import ForumScreen from './pages/ForumScreen';

const Stack = createStackNavigator();

function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false}} name="HomeScreen" component={HomeScreen} />
                <Stack.Screen options={{ headerShown: false}} name="HomeLoggedScreen" component={HomeLoggedScreen} />
                <Stack.Screen options={{ headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
                <Stack.Screen options={{ headerShown: false}} name="ForumDetailScreen" component={ForumDetailScreen} />
                <Stack.Screen options={{title: '', headerShown: false}} name="ForumScreen" component={ForumScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;