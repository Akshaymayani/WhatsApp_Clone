/* eslint-disable react-hooks/exhaustive-deps */
import Animated, {
  SlideInLeft,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {PanGestureHandler, RectButton} from 'react-native-gesture-handler';
import React, {useCallback, useEffect} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

interface Contact {
  _id: string;
  name: string;
  phone: string;
  about: string;
  icon: string;
}
interface Props {
  isVisible: boolean;
  contacts: Contact[];
  onClose: () => void;
}
const NewChatModal = ({isVisible, contacts, onClose}: Props) => {
  const translateY = useSharedValue(600);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateY: translateY.value}],
  }));

  useEffect(() => {
    if (isVisible) {
      translateY.value = withSpring(0, {
        damping: 15,
      });
    }
  }, [isVisible]);

  const closeModal = () => {
    translateY.value = withSpring(600, {damping: 15}, () => {
      runOnJS(onClose)();
    });
  };

  const renderContactItem = useCallback(
    ({item, index}: {item: Contact; index: number}) => (
      <RectButton style={styles.contactItem}>
        <Animated.View entering={SlideInLeft.duration(300).delay(index * 90)}>
          <View style={styles.contactContainer}>
            <View style={styles.contactDetails}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactSubtitle}>{item.about}</Text>
              <Text style={styles.contactNumber}>{item.phone}</Text>
            </View>
            <TouchableOpacity
              style={styles.messageButton}
              onPress={e => e.stopPropagation()}>
              <Icon name="message" size={24} color="#3498db" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </RectButton>
    ),
    [contacts],
  );

  const headerComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Status Activity</Text>
      </View>
    );
  };
  const onGestureEvent = (event: any) => {
    translateY.value =
      event.nativeEvent.translationY > 0 ? event.nativeEvent.translationY : 0;
  };
  const onGestureEnded = () => {
    if (translateY.value > 300) {
      closeModal();
    } else {
      translateY.value = withSpring(0, {
        damping: 15,
      });
    }
  };

  return (
    <Animated.View style={[styles.modal, animatedStyle]}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onEnded={onGestureEnded}>
        <View style={styles.header}>
          <View style={styles.headerNotch} />
        </View>
      </PanGestureHandler>

      <FlatList
        data={contacts}
        keyExtractor={item => item._id.toString()}
        renderItem={renderContactItem}
        ListHeaderComponent={headerComponent}
        contentContainerStyle={styles.contactList}
      />
    </Animated.View>
  );
};

export default NewChatModal;

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '80%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 99,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cfd1d3',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerContainer: {
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  headerText: {
    fontSize: 19,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#141D26',
  },
  headerNotch: {
    height: 4,
    width: '16%',
    borderRadius: 10,
    backgroundColor: '#000',
  },
  closeButton: {
    fontSize: 16,
    color: '#141D26',
  },
  contactList: {
    // paddingHorizontal: 8,
    // paddingVertical: 8,
  },
  contactItem: {
    flex: 1,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  contactDetails: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#777',
  },
  contactNumber: {
    fontSize: 12,
    color: '#555',
  },
  messageButton: {
    padding: 8,
  },
});
