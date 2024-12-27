import Animated, {
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import React, {memo} from 'react';

interface Props {
  duration: number;
  delay: number;
  children: React.ReactNode;
  animationType: 'zoom' | 'fade' | 'slide';
}
const AnimatedView = memo(
  ({animationType, duration, delay, children}: Props) => {
    const enterAnimation =
      animationType === 'zoom'
        ? ZoomIn
        : animationType === 'fade'
        ? FadeIn
        : SlideInLeft;

    const exitAnimation =
      animationType === 'zoom'
        ? ZoomOut
        : animationType === 'fade'
        ? FadeOut
        : SlideOutLeft;
    return (
      <Animated.View
        entering={enterAnimation.duration(duration).delay(delay)}
        exiting={exitAnimation.duration(duration).delay(delay)}>
        {children}
      </Animated.View>
    );
  },
);

export default AnimatedView;
