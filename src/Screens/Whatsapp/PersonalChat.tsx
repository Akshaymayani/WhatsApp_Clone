/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable react-hooks/exhaustive-deps */
import {
  Animated,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {NavigationPath, RootStackParamList} from '../../types/Navigation';
import React, {useCallback, useEffect, useRef, useState} from 'react';

import ActionSheet from '../../components/ActionSheet';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalComponent from '../../utils/ModalComponent';
import {PersonalChatStyles} from '../../Styles/PersonalChatStyles';
import {RefreshChat} from '../../Redux/Features/RefreshChat';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StorageKey} from '../../types/StorageKeyTypes';
import {storage} from '../../mmkv/MmkvStorage';
import {useDispatch} from 'react-redux';
import {useMMKVObject} from 'react-native-mmkv';

type NewChatScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  NavigationPath.Personalchat
>;

type NewChatScreenRouteProp = RouteProp<
  RootStackParamList,
  NavigationPath.Personalchat
>;

type Props = {
  navigation: NewChatScreenNavigationProp;
  route: NewChatScreenRouteProp;
};
const headerHeight =
  Platform.OS === 'ios' ? 110 : Platform.OS === 'android' ? 90 : 100;
const KeyboardOffset =
  Platform.OS === 'ios' ? 115 : Platform.OS === 'android' ? 90 : 0;
const PersonalChat = ({navigation, route}: Props) => {
  const {userId} = route.params;
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [messageList, setMessageList] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [pressedMessageIndex, setPressedMessageIndex] = useState<number | null>(
    null,
  );
  const flatListRef = useRef<FlatList<any>>(null);
  const colorSchema = useColorScheme();
  const [userChat, setUserChat] = useMMKVObject<any>(
    StorageKey.USERCHAT,
    storage,
  );
  const dispatch = useDispatch();
  const styles = PersonalChatStyles();

  const CustomHeaderTitle = useCallback(({name, lastSeen}: any) => {
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/user.jpeg')}
          style={styles.image}
        />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.lastSeen}>{lastSeen}</Text>
        </View>
      </View>
    );
  }, []);

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };
  const handleSend = () => {
    if (!message) {
      return;
    }
    const updatedMessages = [...messageList, message];
    setMessageList(updatedMessages);
    saveMessages(updatedMessages);
    setMessage('');
    dispatch(RefreshChat());
  };

  useEffect(() => {
    // Scroll to the bottom when the messageList changes (initial load or new message)
    flatListRef.current?.scrollToEnd({animated: true});
  }, [userChat]);

  useEffect(() => {
    if (userChat && userChat[userId.id]) {
      setMessageList(userChat[userId.id]);
    }
  }, [userChat, userId.id]);

  useEffect(() => {
    (() => {
      try {
        const userChat = storage.getString(StorageKey.USERCHAT);
        if (userChat) {
          const parsedChat = JSON.parse(userChat);
          console.log({parsedChat});
          if (parsedChat[userId.id]) {
            setMessageList(parsedChat[userId.id]);
          } else {
            setMessageList([]);
          }
        } else {
          setMessageList([]);
        }
      } catch (error) {
        console.error('Failed to load messages from MMKV', error);
        setMessageList([]);
      }
    })();
  }, []);

  const saveMessages = (updatedMessages: any) => {
    try {
      const updatedUserChat = {
        ...userChat,
        [userId.id]: updatedMessages,
      };
      setUserChat(updatedUserChat);
    } catch (error) {
      console.error('Error saving messages to MMKV:', error);
    }
  };
  const handleClearChat = () => {
    const updatedUserChat = {...userChat};
    updatedUserChat[userId.id] = []; // Set the specific user's messages to an empty array
    setUserChat(updatedUserChat); // Update the state
    saveMessages([]); // Save the empty array for this user in MMKV
    setIsVisible(false); // Close the modal
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {backgroundColor: '#28343C', height: headerHeight},
      headerTintColor: '#fff',
      headerTitleAlign: 'left',
      headerTitle: () => (
        <CustomHeaderTitle name={userId.name} lastSeen={userId.date} />
      ),
      //   headerStyle: {
      //     backgroundColor: '#f4511e'
      //   },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => {
        return (
          <View style={styles.rightContainer}>
            <TouchableOpacity>
              <FontAwesome5 name="video" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="call" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingHorizontal: 3}}
              onPress={() => setIsVisible(true)}>
              <Fontisto name="more-v-a" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 10}}>
          <FontAwesome5 name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const handleLongPress = (index: number) => {
    setPressedMessageIndex(index);
  };
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const renderItem = ({item, index}: {item: string; index: number}) => {
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
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        enabled={true}
        style={{flex: 1}}
        keyboardVerticalOffset={KeyboardOffset}
        behavior="height">
        <StatusBar
          barStyle={colorSchema === 'dark' ? 'dark-content' : 'light-content'}
          backgroundColor="transparent"
          translucent={true}
        />
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            ref={flatListRef}
            data={messageList}
            // keyboardDismissMode="on-drag"
            contentContainerStyle={styles.messageWrapper}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
          {/* keyboard code */}
          <View style={styles.keyboardContainer}>
            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Entypo
                  name="emoji-happy"
                  size={24}
                  color="#28343C"
                  style={styles.icon}
                />
              </View>

              <TextInput
                onChangeText={text => setMessage(text)}
                placeholder="Type a message"
                style={styles.input}
                value={message}
              />
              {message.length > 0 ? null : (
                <React.Fragment>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Feather
                      name="share-2"
                      size={24}
                      color="#28343C"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Ionicons
                      name="camera-outline"
                      size={24}
                      color="#28343C"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </React.Fragment>
              )}
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSend}
              style={{width: '100%', height: '100%'}}>
              <View style={styles.sendbtn}>
                {message.length > 0 ? (
                  <Feather name="send" size={24} color="#fff" />
                ) : (
                  <Feather name="mic" size={24} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          </View>
          {isVisible && (
            <ModalComponent isVisible={isVisible} toggleModal={handleVisible}>
              <ActionSheet
                handleClearChat={handleClearChat}
                handleVisible={handleVisible}
              />
            </ModalComponent>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalChat;
