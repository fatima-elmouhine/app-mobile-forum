import * as React from 'react';
import { useState, useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/HomeScreen';
import LogoScreen from './component/LogoScreen';
import GeneralConditionScreen from './component/GeneralConditionScreen';
import LoginScreen from './component/LoginScreen';
import PaginationSliderScreen from './component/PaginationSliderScreen';

const Stack = createStackNavigator();

function Routes() {  
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;