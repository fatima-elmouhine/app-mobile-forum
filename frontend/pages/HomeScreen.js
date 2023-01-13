import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, { useHandler, useEvent, runOnJS } from 'react-native-reanimated';
import LogoScreen from '../component/LogoScreen.js';
import GeneralConditionScreen from '../component/GeneralConditionScreen.js';
import LoginScreen from '../component/LoginScreen.js';
import PaginationSliderScreen from '../component/PaginationSliderScreen.js';
import * as SecureStore from 'expo-secure-store'

const AnimatedPager = Animated.createAnimatedComponent(PagerView);

export function usePagerScrollHandler(handlers, dependencies) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const subscribeForEvents = ['onPageScroll'];

  return useEvent(
    (event) => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
}

const App = ({ navigation }) => {

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      if (token) {
        navigation.navigate('HomeLoggedScreen');
      }
    });
  }, []);

  const [page, setPage] = useState(0);

  const handler = usePagerScrollHandler({
    onPageScroll: (e) => {
      'worklet';
      runOnJS(setPage)(e.position);
    },
  });

  return (

    <View style={{ flex: 1 }}>
      <AnimatedPager initialPage={0} style={{ flex: 1 }} onPageScroll={handler}>
        <View key="0" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LogoScreen />
        </View>
        <View key="1" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GeneralConditionScreen />
        </View>
        <View key="2" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LoginScreen navigation={navigation}/>
        </View>
      </AnimatedPager>
      <PaginationSliderScreen page={page} />
    </View>
  );
};
  
export default App;