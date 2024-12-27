/* eslint-disable react-hooks/exhaustive-deps */
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import {
    Dimensions,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import {ChatData} from '../../DATA/Chat';
import {ChatItemTypes} from '../../types/WhatsappChatTypes';
import Fontawesome from 'react-native-vector-icons/FontAwesome5';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationPath} from '../../types/Navigation';
import {RectButton} from 'react-native-gesture-handler';
import {TouchableOpacity} from 'react-native';
import {updateSelection} from '../../Redux/Features/HeaderSelection';
import {useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

/* eslint-disable react-native/no-inline-styles */
    
                          
  const {width} = Dimensions.get('window');
  const chatCategory = ['All', 'Unread', 'Groups', 'Pinned', 'Muted'];
  const Chats = ({navigation}: any) => {
    const [chatData] = useState(ChatData);
    const [selectedChat, setSelelctedChat] = useState<string>('All');
    const focused = useIsFocused();
    const dispatch = useDispatch();
    const categoryVisibility = useSharedValue(1);
    const displayVisibility = useSharedValue('flex');
    const translateY = useSharedValue(0);
    const [prevOffset, setPrevOffset] = useState(0);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const MarginBottom =
      Platform.OS === 'android' ? 90 : Platform.OS === 'ios' ? 50 : 90;
  
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
  
    const renderChatItem = useCallback(({item}: {item: ChatItemTypes}) => {
      const {name, date, Subtitle, disappear} = item;
      return (
        <TouchableOpacity
          style={{
            backgroundColor: '#121B22',
            height: 75,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            elevation: 2,
          }}
          onPress={() => {
            navigation.navigate(NavigationPath.Personalchat, {
              userId: item,
            });
          }}
          activeOpacity={0.7}>
          <View style={[styles.chat_main]}>
            <View style={styles.chat_left}>
              <Animated.View style={[styles.image]}>
                <Animated.Image
                  alt="user Image"
                  source={require('../../assets/user.jpeg')}
                  style={styles.image}
                />
              </Animated.View>
              {disappear && <Ionicons name="timer" style={styles.timer_image} />}
            </View>
            <View style={styles.chat_right}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={{color: '#fff', fontSize: 15}}>{name}</Text>
                </View>
                <View>
                  <Text style={styles.chatdate}>{date}</Text>
                </View>
              </View>
              <View style={{marginTop: 8, flexDirection: 'row'}}>
                {Subtitle.message !== 'NULL' && Subtitle.tickmark ? (
                  Subtitle.markcount === 1 ? (
                    <Ionicons name="checkmark" color="#fff" size={18} />
                  ) : (
                    <Ionicons
                      name="checkmark-done"
                      color={`${Subtitle.seen ? '#437EFE' : '#fff'}`}
                      size={18}
                    />
                  )
                ) : null}
                <Text style={{color: '#fff', marginLeft: 5}}>
                  {Subtitle.message !== 'NULL' ? Subtitle.message : ''}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    }, []);
  
    const renderChatCategory = useCallback(
      ({item}: any) => {
        const selected = selectedChat === item;
        return (
          <RectButton
            style={[
              {
                paddingHorizontal: 12,
                paddingVertical: 5,
                borderRadius: 8,
                marginRight: 8,
              },
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
  
    const handleVisibilityChange = (visible: boolean) => {
      if (visible) {
        // Show the category: animate opacity and translateY simultaneously
        categoryVisibility.value = withTiming(1, {duration: 300});
        translateY.value = withTiming(0, {duration: 300});
        timeoutRef.current = setTimeout(() => {
          displayVisibility.value = 'flex'; // Ensure it's visible
        }, 0); // Immediate for showing
      } else {
        // Hide the category: animate opacity and translateY simultaneously
        categoryVisibility.value = withTiming(0, {duration: 300});
        translateY.value = withTiming(-30, {duration: 300});
  
        // After the animation completes, hide the display
        timeoutRef.current = setTimeout(() => {
          displayVisibility.value = 'none';
        }, 300); // Matches the duration of the animations
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
  
    const categoryStyle = useAnimatedStyle(() => {
      return {
        opacity: categoryVisibility.value,
        transform: [
          {translateY: withSpring(categoryVisibility.value === 0 ? -20 : 0)},
        ],
        display: displayVisibility.value,
      };
    });
  
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
          <TouchableOpacity activeOpacity={0.7}>
            <View style={styles.archived__main}>
              <View style={styles.archived__icon}>
                <Foundation name="archive" color="#525c62" size={30} />
              </View>
              <View style={{width: '80%'}}>
                <Text style={styles.archived__title}>Archived</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Animated.View
            style={[
              categoryStyle,
              {
                paddingHorizontal: 8,
                paddingVertical: 12,
                backgroundColor: '#2F3A44',
              },
            ]}>
            <FlatList
              data={chatCategory}
              renderItem={renderChatCategory}
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.toString()}
            />
          </Animated.View>
          <View style={styles.chat__main}>
            <FlatList
              data={chatData}
              keyExtractor={(item: ChatItemTypes) => item.id.toString()}
              maximumZoomScale={2}
              ListFooterComponent={FooterComponent}
              renderItem={renderChatItem}
              onScroll={handleScroll}
            />
          </View>
        </View>
        <View style={styles.newmessage}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate(NavigationPath.Newchat)}>
            <MaterialIcon name="message-plus" color="#44A982" size={30} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Chats;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // backgroundColor: '#3d484f',
      backgroundColor: '#121B22',
    },
    scrollView: {
      flexGrow: 1,
    },
    chatContainer: {
      flex: 1,
    },
    archived__main: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 9,
      // backgroundColor: '#121B22',
      borderBottomWidth: 4,
      borderBottomColor: '#b9bdc0',
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
      // shadowOpacity: 30,
      // shadowColor: '#fff',
    },
    chat__main: {
      width,
      display: 'flex',
      flexDirection: 'row',
    },
    archived__icon: {
      width: '20%',
      alignItems: 'center',
    },
    archived__title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginLeft: 10,
    },
    chat_main: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#121B22',
      borderBottomWidth: 3,
      borderBottomColor: '#525c62',
      paddingVertical: 4,
    },
    chat_left: {
      width: '20%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chat_right: {
      width: '80%',
      height: '100%',
      flexDirection: 'column',
      padding: 6,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 60,
    },
    timer_image: {
      position: 'absolute',
      bottom: '-10%',
      right: '15%',
      width: '35%',
      height: '55%',
      borderRadius: 100,
      color: '#687076',
      fontSize: 30,
      zIndex: 11,
    },
    chatdate: {
      color: '#fff',
      fontSize: 13,
      marginRight: 5,
      marginTop: 5,
    },
    footer: {
      color: '#93999d',
      textAlign: 'center',
      fontSize: 14,
    },
    newmessage: {
      padding: 10,
      backgroundColor: '#3d484f',
      borderRadius: 10,
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 10,
      width: 55,
      height: 55,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  