import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import Animated from 'react-native-reanimated';
import React from 'react';
import {StyleSheet} from 'react-native';

function TapHandler() {
  const singleTap = Gesture.Tap().onEnd((_event, success) => {
    if (success) {
      console.log('single tap!');
    }
  });
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        console.log(_event, success);
      }
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);

  return (
    <GestureDetector gesture={taps}>
      <Animated.View style={styles.ball} />
    </GestureDetector>
  );
}
export default TapHandler;
const styles = StyleSheet.create({
  ball: {
    width: 80,
    marginTop: 30,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
});
