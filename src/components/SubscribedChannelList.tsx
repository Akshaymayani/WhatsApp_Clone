/* eslint-disable react-hooks/exhaustive-deps */
import {Image, Text, View} from 'react-native';
/* eslint-disable react-native/no-inline-styles */
import React, {memo, useCallback} from 'react';

import {ChatStyle} from '../Styles/ChatStyle';
import {FlashList} from '@shopify/flash-list';
import Octicons from 'react-native-vector-icons/Octicons';
import {SubscribedChannelsType} from '../types/WhatsappChatTypes';

type Props = {
  List: SubscribedChannelsType[];
};
const SubscribedChannelList = memo(({List}: Props) => {
  const styles = ChatStyle();
  const renderItem = useCallback(({item}: {item: SubscribedChannelsType}) => {
    return (
      <View style={styles.shadow_container}>
        <View style={styles.channel_container}>
          <View style={styles.channel_header}>
            <View style={styles.channel_image}>
              <Image
                source={item.imagePath}
                alt="Channel Image"
                style={[styles.images]}
              />
            </View>
            <Text style={{fontSize: 17, fontWeight: 'bold', marginLeft: 10}}>
              {item.name}
            </Text>
          </View>
          <View style={styles.channel_desc}>
            <View style={styles.desc_text}>
              <Text style={{fontSize: 16}}>{item.description}</Text>
            </View>
          </View>
          <View style={styles.channel_footer}>
            <Text>
              <Octicons name="dot-fill" color="#388C7E" size={10} />
              <Text style={{color: '#388C7E'}}>
                {' '}
                {item.unreadCount} unread
              </Text>{' '}
              <Octicons
                name="dot-fill"
                color="#000"
                size={10}
                style={{marginLeft: 20}}
              />
              <Text> {item.lastMessageTime}</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);
  return (
    <FlashList
      data={List}
      estimatedItemSize={5}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
});

export default SubscribedChannelList;
