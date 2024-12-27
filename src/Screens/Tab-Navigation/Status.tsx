/* eslint-disable react-hooks/exhaustive-deps */

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
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {ChatStyle} from '../../Styles/ChatStyle';
import {ContactList} from '../../DATA/ContactList';
import EmojiPicker from '../../components/EmojiPicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import HeaderCell from '../../components/HeaderCell';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ModalComponent from '../../utils/ModalComponent';
import NewChatModal from '../Whatsapp/NewChatModal';
import {StatusStyle} from '../../Styles/StatusStyle';
import SubscribedChannelList from '../../components/SubscribedChannelList';
import {SubscribedChannels} from '../../DATA/Channel';
import {updateSelection} from '../../Redux/Features/HeaderSelection';
import {useDispatch} from 'react-redux';

type StatusNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Status'>,
  NavigationProp<RootStackParamList>
>;
interface Props {
  navigation: StatusNavigationProp;
}
const Status = ({navigation}: Props) => {
  const [contactList] = useState(ContactList);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [visibleSheet, setVisibleSheet] = useState<boolean>(false);
  const styles = ChatStyle();
  const styless = StatusStyle();
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const toggleModal = () => {
    setIsVisible(!isVisible);
  };
  const data = useMemo(
    () =>
      Array.from({length: 11}, (_, index) => ({
        id: index,
        name: 'Akshay Mayani',
        isVerified: index < 6,
      })),
    [],
  );
  const renderFollowCard = useCallback(
    ({item}: {item: {id: number; name: string; isVerified: boolean}}) => {
      return (
        <View style={styless.card}>
          <View style={[styles.chat_left, styless.cardImage]}>
            <Image
              alt="user Image"
              source={require('../../assets/user.jpeg')}
              style={[styles.images]}
              resizeMode="cover"
            />
            {item.id % 2 === 0 && (
              <MaterialIcons name="verified" style={styless.cardImageIcon} />
            )}
          </View>
          <View style={styless.cardTextContainer}>
            <Text style={styless.cardName}>{item.name}</Text>
          </View>
          <View style={styless.cardButtonWrapper}>
            <TouchableOpacity activeOpacity={0.7} style={styless.cardButton}>
              <Text style={styless.cardButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    },
    [],
  );

  const openBottomSheet = () => {
    setVisibleSheet(true);
  };

  const closeBottomSheet = () => {
    setVisibleSheet(false);
  };

  useEffect(() => {
    focused && dispatch(updateSelection('status'));
  }, [dispatch, focused]);
  return (
    <View style={styless.MainContainer}>
      <ScrollView
        style={styless.container}
        showsVerticalScrollIndicator={false}>
        <View style={styless.container}>
          <HeaderCell
            toggleModal={toggleModal}
            title="Status"
            iconLibrary="Fontisto"
            iconName="more-v-a"
          />
          <View style={styles.status_carousel}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {Array.from({length: 11}, (_, index) => {
                return (
                  <View key={index} style={styless.statusContainer}>
                    <View
                      style={[styles.chat_left, styless.statusImageContainer]}>
                      <Image
                        alt="user Image"
                        source={require('../../assets/user.jpeg')}
                        style={
                          index === 0
                            ? [styles.imagess, {borderColor: '#54d365'}]
                            : [styles.imagess]
                        }
                        resizeMode="cover"
                      />
                      {index === 0 ? (
                        <View style={styless.statusImageIconView}>
                          <Fontisto
                            name="plus-a"
                            size={24}
                            style={styless.statusImageIcon}
                          />
                        </View>
                      ) : null}
                    </View>
                    <View style={styless.statusName}>
                      <Text style={styless.statusNameText}>
                        {index === 0
                          ? 'My Status'
                          : index > 0 && `Status ${index} is updated`.length > 9
                          ? `Status ${index} is updated`.substring(0, 9) + '...'
                          : `Status ${index} is updated`}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
          <View>
            <HeaderCell
              toggleModal={() =>
                navigation.navigate(NavigationPath.SubscribedChannel)
              }
              title="Subscribed Channels"
              iconLibrary="Fontisto"
              iconName="plus-a"
            />
            <SubscribedChannelList List={SubscribedChannels} />
          </View>

          <View style={styless.cardContainer}>
            <HeaderCell
              toggleModal={() =>
                navigation.navigate(NavigationPath.MasterChannel)
              }
              title="Find Channel"
              iconLibrary="MaterialIcons"
              iconName="arrow-forward-ios"
              iconWithText="See All"
            />
            <FlatList
              data={data}
              renderItem={renderFollowCard}
              keyExtractor={item => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styless.moreOptionContainer}>
        <View style={styless.iconButton}>
          <TouchableOpacity activeOpacity={0.7} onPress={openBottomSheet}>
            <MaterialIcons name="mode-edit" color="#000" size={30} />
          </TouchableOpacity>
        </View>
        <View style={[styless.iconButton, styless.cameraButton]}>
          <TouchableOpacity activeOpacity={0.7}>
            <MaterialIcon name="camera-outline" color="#fff" size={30} />
          </TouchableOpacity>
        </View>
      </View>
      {isVisible && (
        <ModalComponent isVisible={isVisible} toggleModal={toggleModal}>
          <EmojiPicker toggleModal={toggleModal} />
        </ModalComponent>
      )}
      {visibleSheet && (
        <NewChatModal
          isVisible={visibleSheet}
          contacts={contactList}
          onClose={closeBottomSheet}
        />
      )}
    </View>
  );
};

export default Status;
