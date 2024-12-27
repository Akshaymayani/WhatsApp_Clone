/* eslint-disable react-hooks/exhaustive-deps */
import React, {memo, useMemo} from 'react';
/* eslint-disable react-native/no-inline-styles */
import {Text, TouchableOpacity, View} from 'react-native';

import Animated from 'react-native-reanimated';
import {ChatPageStyles} from '../Styles/ChatPageStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {NavigationPath} from '../types/Navigation';
import {RootState} from '../Redux/Store';
import {StorageKey} from '../types/StorageKeyTypes';
import {storage} from '../mmkv/MmkvStorage';
import {useSelector} from 'react-redux';

// import {useIsFocused} from '@react-navigation/native';

const RenderChatList = memo(({item, navigation}: any) => {
  const RefreshChat = useSelector(
    (store: RootState) => store.refreshChat.value,
  );
  const styles = ChatPageStyles();
  const UserChatInfo = useMemo(() => {
    const ChatInfo = storage.getString(StorageKey.USERCHAT);
    const UserChat = ChatInfo ? JSON.parse(ChatInfo) : null;
    return UserChat;
  }, [RefreshChat]);

  // console.log({UserChatInfo});
  //   console.log('Rendered ======>');
  const {name, date, disappear, id} = item;
  const lastMessage = UserChatInfo
    ? UserChatInfo[id]?.length > 0
      ? UserChatInfo[id].at(-1)
      : null
    : null;
  return (
    <TouchableOpacity
      style={styles.chatItemContainer}
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
              source={require('../assets/user.jpeg')}
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
          <View style={styles.chat_messsage}>
            {lastMessage ? (
              <Ionicons name="checkmark-done" color="#437EFE" size={18} />
            ) : null}
            <Text style={styles.chat_messageText}>
              {lastMessage
                ? lastMessage.length > 35
                  ? lastMessage.substring(0, 32).concat('...')
                  : lastMessage
                : ''}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default RenderChatList;
