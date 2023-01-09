import * as React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import Animated, { useHandler, useEvent } from 'react-native-reanimated';
import LogoScreen from '../component/LogoScreen.js';
import GeneralConditionScreen from '../component/GeneralConditionScreen.js';
import LoginScreen from '../component/LoginScreen.js';
import PaginationSliderScreen from '../component/PaginationSliderScreen.js';
import HomeLoggedScreen from './HomeLoggedScreen.js';

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
  // const [page, setPage] = useState(0);

  const handler = usePagerScrollHandler({
    onPageScroll: (e) => {
      'worklet';
      // setPage(e.position);
      // console.log('logPosition', e.position);
    },
  });

  return (

    <View style={{ flex: 1 }}>
      <AnimatedPager initialPage={0} style={{ flex: 1 }} onPageScroll={handler}>
        <View key="1" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LogoScreen />
        </View>
        <View key="2" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <GeneralConditionScreen />
        </View>
        <View key="3" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LoginScreen navigation={navigation} />
        </View>
        {/* <View key="4" style={{ justifyContent: 'center', alignItems: 'center' }}>
          <HomeLoggedScreen />
        </View> */}
      </AnimatedPager>
      <PaginationSliderScreen /*page={page}*/ />
    </View>
  );
};
  
export default App;