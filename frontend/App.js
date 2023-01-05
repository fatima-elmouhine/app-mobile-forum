import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';
import PagerView from 'react-native-pager-view';
import Home from './component/home.js';
import GeneralCondition from './component/generalCondition.js';
import Login from './component/login.js';

const App = () => {
  return (
    <PagerView initialPage={0} style={{ flex: 1 }}>
      <View key="1" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Home />
      </View>
      <View key="2" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <GeneralCondition />
      </View>
      <View key="3" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Login />
      </View>
    </PagerView>
  );
};
  
export default App;