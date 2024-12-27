import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
/* eslint-disable react/react-in-jsx-scope */
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

import {StyleSheet} from 'react-native';

export default function Simultaneous() {
  const offset = useSharedValue({x: 0, y: 0});
  const start = useSharedValue({x: 0, y: 0});
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const savedRotation = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value.x},
        {translateY: offset.value.y},
        {scale: scale.value},
        {rotateZ: `${rotation.value}rad`},
      ],
    };
  });

  const dragGesture = Gesture.Pan()
    .averageTouches(true)
    .onUpdate(e => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    });

  const zoomGesture = Gesture.Pinch()
    .onUpdate(event => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  const rotateGesture = Gesture.Rotation()
    .onUpdate(event => {
      rotation.value = savedRotation.value + event.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const composed = Gesture.Simultaneous(
    dragGesture,
    Gesture.Simultaneous(zoomGesture, rotateGesture),
  );

  return (
    <Animated.View>
      <GestureDetector gesture={composed}>
        <Animated.View style={[animatedStyles, styles.ball]} />
      </GestureDetector>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  ball: {
    width: 80,
    marginTop: 30,
    height: 80,
    borderRadius: 80,
    backgroundColor: 'blue',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'red',
  },
});
