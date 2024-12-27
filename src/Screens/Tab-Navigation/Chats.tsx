/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  BottomTabParamList,
  NavigationPath,
  RootStackParamList,
} from '../../types/Navigation';
import {
  CompositeNavigationProp,
  NavigationProp,
  useIsFocused,
} from '@react-navigation/native';
import {FlatList, Platform, Text, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ChatData} from '../../DATA/Chat';
import {ChatItemTypes} from '../../types/WhatsappChatTypes';
import {ChatPageStyles} from '../../Styles/ChatPageStyles';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RectButton} from 'react-native-gesture-handler';
import RenderChatList from '../../components/RenderChatList';
import {TouchableOpacity} from 'react-native';
import {updateSelection} from '../../Redux/Features/HeaderSelection';
import {useDispatch} from 'react-redux';

const chatCategory = ['All', 'Unread', 'Groups', 'Pinned', 'Muted'];
const MarginBottom = Platform.OS === 'android' ? 90 : 80;
const MarginTop = Platform.OS === 'android' ? 45 : 40;

type ChatsNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Chat'>,
  NavigationProp<RootStackParamList>
>;
interface Props {
  navigation: ChatsNavigationProp;
}
const Chats = ({navigation}: Props) => {
  const [chatData] = useState(ChatData);
  const [selectedChat, setSelelctedChat] = useState<string>('All');
  const [prevOffset, setPrevOffset] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const styles = ChatPageStyles();
  const categoryVisibility = useSharedValue(1);
  const marginTop = useSharedValue(MarginTop);
  const translateY = useSharedValue(0);

  const categoryStyle = useAnimatedStyle(() => {
    return {
      opacity: categoryVisibility.value,
      transform: [{translateY: translateY.value}],
    };
  });
  const marginStyle = useAnimatedStyle(() => {
    return {marginTop: marginTop.value};
  });

  const handleVisibilityChange = (visible: boolean) => {
    if (visible) {
      marginTop.value = withTiming(MarginTop, {duration: 300});
      categoryVisibility.value = withTiming(1, {duration: 300});
      translateY.value = withSpring(0, {damping: 20, stiffness: 90});
    } else {
      marginTop.value = withTiming(0, {duration: 300});
      categoryVisibility.value = withTiming(0, {duration: 300});
      translateY.value = withSpring(-15, {damping: 20, stiffness: 90});
    }
  };

  const handleScroll = useCallback(
    (event: any) => {
      const contentOffsetY = event.nativeEvent.contentOffset.y;
      if (contentOffsetY <= 0) {
        if (categoryVisibility.value === 0) {
          handleVisibilityChange(true);
          categoryVisibility.value = 1;
        }
      } else {
        if (contentOffsetY > prevOffset && categoryVisibility.value === 1) {
          handleVisibilityChange(false);
          categoryVisibility.value = withSpring(0, {
            damping: 20,
            stiffness: 90,
          });
        }

        if (contentOffsetY < prevOffset) {
          const scrollDistance = prevOffset - contentOffsetY;
          if (scrollDistance > 60 && categoryVisibility.value === 0) {
            handleVisibilityChange(true);
            categoryVisibility.value = withSpring(1, {
              damping: 20,
              stiffness: 90,
            });
          }
        }
      }
      setPrevOffset(contentOffsetY);
    },
    [prevOffset, categoryVisibility],
  );

  const FooterComponent = useCallback(() => {
    return (
      <View style={{marginBottom: MarginBottom}}>
        <View style={{paddingVertical: 20}}>
          <Text style={styles.footer}>
            Tap and Hold on a chat for more Options
          </Text>
        </View>
        <View style={{paddingBottom: 40}}>
          <Text style={styles.footer}>
            <Fontawesome name="lock" color="#93999d" size={14} />
            <Text> Your personal message are </Text>
            <Text style={{color: 'green'}}>end-to-end encrypted.</Text>
          </Text>
        </View>
      </View>
    );
  }, []);

  const renderChatCategory = useCallback(
    ({item}: any) => {
      const selected = selectedChat === item;
      return (
        <RectButton
          style={[
            styles.chatCategoryBtn,
            selected
              ? {backgroundColor: '#D4F6CB'}
              : {backgroundColor: '#FAFAFA'},
          ]}
          onPress={() => setSelelctedChat(item)}>
          <Text style={[selected ? {color: '#345a36'} : {color: '#000'}]}>
            {item}
          </Text>
        </RectButton>
      );
    },
    [selectedChat],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    focused && dispatch(updateSelection('Chat'));
  }, [dispatch, focused]);

  return (
    <View style={styles.container}>
      <View style={styles.chatContainer}>
        <TouchableOpacity activeOpacity={0.7} style={{position: 'relative'}}>
          <View style={styles.archived__main}>
            <View style={styles.archived__icon}>
              <Foundation name="archive" color="#525c62" size={30} />
            </View>
            <View style={{width: '80%'}}>
              <Text style={styles.archived__title}>Archived</Text>
            </View>
          </View>
        </TouchableOpacity>
        <Animated.View style={[categoryStyle, styles.chatCategoryContainer]}>
          <FlatList
            data={chatCategory}
            renderItem={renderChatCategory}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.toString()}
          />
        </Animated.View>
        <Animated.View style={[styles.chat__main, marginStyle]}>
          <FlatList
            data={chatData}
            keyExtractor={(item: ChatItemTypes) => item.id.toString()}
            maximumZoomScale={2}
            windowSize={5}
            initialNumToRender={10}
            ListFooterComponent={FooterComponent}
            renderItem={({item}) => (
              <RenderChatList item={item} navigation={navigation} />
            )}
            onScroll={handleScroll}
          />
        </Animated.View>
      </View>
      <View style={styles.newmessage}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate(NavigationPath.ContactList)}>
          <MaterialIcon name="message-plus" color="#44A982" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Chats;
