import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';

interface Props {
  children: any;
  leftAction: (progrss: any, dragx: any) => JSX.Element;
  rightAction: () => JSX.Element;
  handleSwipeOpen: (direction: 'right' | 'left', itemId: number) => void;
  itemId: number;
}
const SwipableView = ({
  children,
  leftAction,
  rightAction,
  handleSwipeOpen,
  itemId,
}: Props) => {
  return (
    <Swipeable
      renderLeftActions={leftAction}
      renderRightActions={rightAction}
      onSwipeableWillOpen={direction => handleSwipeOpen(direction, itemId)}
      friction={1.5}
      overshootLeft={false}
      overshootRight={false}>
      {children}
    </Swipeable>
  );
};

export default SwipableView;
