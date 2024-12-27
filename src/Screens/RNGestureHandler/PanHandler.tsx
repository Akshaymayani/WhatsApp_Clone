import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import React from 'react';
import {StyleSheet} from 'react-native';

const PanHandler = () => {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x: 0, y: 0});
  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: withSpring(isPressed.value ? 1.5 : 1)},
      ],
    };
  });
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      offset.value = {
        x: e.translationX,
        y: e.translationY,
      };
    })
    .onEnd(() => {
      isPressed.value = false;
      offset.value = {
        x: withSpring(0),
        y: withSpring(0),
      };
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.ball, AnimatedStyle]} />
    </GestureDetector>
  );
};

export default PanHandler;
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
