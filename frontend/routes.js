import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserContextProvider from './context/UserContext.js';

import HomeScreen from './pages/HomeScreen';
import HomeLoggedScreen from './pages/HomeLoggedScreen.js';
import ProfileScreen from './pages/ProfileScreen.js';
import ForumDetailScreen from './pages/ForumDetailScreen.js';
import ForumScreen from './pages/ForumScreen';
import MenuButton from './component/MenuButton.js';
import ThemeScreen from './pages/ThemeScreen.js';
import SectionChoiceScreen from './pages/SectionChoiceScreen.js';
import ForumHomeScreen from './pages/ForumHomeScreen.js';
import NewTopicScreen from './pages/NewTopicScreen.js';
import SearchByThemeScreen from './pages/SearchByThemeScreen.js';
import CoursesScreen from './pages/CoursesScreen.js';

const Stack = createStackNavigator();

function Routes() {
    return (
        <UserContextProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen options={{ headerShown: false}} name="HomeScreen" component={HomeScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="HomeLoggedScreen" component={HomeLoggedScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="ProfileScreen" component={ProfileScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="ForumDetailScreen" component={ForumDetailScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="ForumScreen" component={ForumScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="ThemeScreen" component={ThemeScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="SectionChoiceScreen" component={SectionChoiceScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="ForumHomeScreen" component={ForumHomeScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="NewTopicScreen" component={NewTopicScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="SearchByThemeScreen" component={SearchByThemeScreen} />
                    <Stack.Screen options={{ headerShown: false}} name="CoursesScreen" component={CoursesScreen} />
                </Stack.Navigator>
            <MenuButton/>
            </NavigationContainer>
        </UserContextProvider>
    );
}

export default Routes;