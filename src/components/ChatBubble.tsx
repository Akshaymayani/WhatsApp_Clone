/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo, useEffect, useRef, useState} from 'react';

interface Props {
  item: any;
  index: number;
  handleLongPress: (index: number) => void;
}
const {width} = Dimensions.get('window');

const ChatBubble = memo(({item, index, handleLongPress}: Props) => {
  const [pressedMessageIndex, setPressedMessageIndex] = useState<number | null>(
    null,
  );
  const scaleAnim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (pressedMessageIndex === index) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [pressedMessageIndex, index]);
  return (
    <Pressable
      onLongPress={() => handleLongPress(index)}
      style={({pressed}) => [
        styles.messageContainer,
        {backgroundColor: pressed ? '#e3f2fd' : '#f1f1f1'},
      ]}>
      <Animated.View
        style={{
          transform: [{scale: scaleAnim}],
          alignSelf: 'flex-end',
        }}>
        <View style={styles.chatBubble}>
          <Text style={styles.messageText}>{item}</Text>
          <View style={styles.notch} />
        </View>
      </Animated.View>
    </Pressable>
  );
});

export default ChatBubble;
const styles = StyleSheet.create({
  messageText: {
    backgroundColor: '#a6a6a6',
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    padding: 5,
    borderRadius: 5,
    textAlign: 'left',
  },
  messageContainer: {
    marginVertical: 3,
    width,
  },
  chatBubble: {
    maxWidth: 300,
    paddingRight: 8,
    backgroundColor: '#e6f7ff',
    borderTopRightRadius: 0,
    position: 'relative',
  },
  notch: {
    position: 'absolute',
    bottom: 0,
    right: 1,
    width: 12,
    height: 6,
    backgroundColor: '#a6a6a6',
    borderBottomRightRadius: 1,
    borderTopRightRadius: 10,
    transform: [{rotate: '0deg'}],
  },
});
