import * as React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
// import PagerView from 'react-native-pager-view';
import Home from './component/home.js';
import GeneralCondition from './component/generalCondition.js';
import Login from './component/login.js';

const App = () => {
  const width = Dimensions.get('window').width;
  return (
    <View style={{ flex: 1 }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <View
            style={{
              flex: 1,
              borderWidth: 1,
              justifyContent: 'center',
            }}
          >
            {index === 0 && <Home />}
            {index === 1 && <GeneralCondition />}
            {index === 2 && <Login />}
          </View>
        )}
      />
    </View>
  );
};
  
export default App;