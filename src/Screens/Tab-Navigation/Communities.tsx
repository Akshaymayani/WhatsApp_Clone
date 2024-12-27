import {
  ActionSheetIOS,
  Dimensions,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import React, {useCallback, useEffect, useState} from 'react';

import {CommunityPageStyles} from '../../Styles/CommunityPageStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Group {
  id: number;
  name: string;
  lastMessage: string;
  unreadCount: number;
}
const {height} = Dimensions.get('window');
const MenuOptions = ['Create Group', 'Join Group', 'Exit Group', 'Cancel'];
const CommunityPage = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const MenuHeight =
    Platform.OS === 'android' ? 380 : Platform.OS === 'ios' ? 400 : 400;
  const menuTranslateY = useSharedValue(height);
  const styles = CommunityPageStyles();
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const handleIosMenu = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: MenuOptions,
        destructiveButtonIndex: 3,
        cancelButtonIndex: 4,
        userInterfaceStyle: 'light',
      },
      function () {},
    );

  useEffect(() => {
    console.log('menuvisible', menuVisible);
  }, [menuVisible]);

  useEffect(() => {
    menuTranslateY.value = menuVisible
      ? withTiming(height - MenuHeight)
      : withTiming(height);
  }, [menuTranslateY.value, menuVisible]);

  const menuStyle = useAnimatedStyle(() => ({
    transform: [{translateY: menuTranslateY.value}],
  }));

  const groups = Array.from({length: 10}, (_, i) => ({
    id: i + 1,
    name: `Group ${i + 1}`,
    lastMessage: `This is the last message in Group ${i + 1}`,
    unreadCount: i % 3 === 0 ? i : 0,
  }));

  const renderGroup = useCallback(
    ({item}: {item: Group}) => (
      <TouchableOpacity style={styles.groupContainer} activeOpacity={0.8}>
        <Icon name="account-group" size={24} color="#28343C" />
        <View style={styles.groupText}>
          <Text style={styles.groupName}>{item.name}</Text>
          <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        </View>
        {item.unreadCount > 0 && (
          <Text style={styles.unreadBadge}>{item.unreadCount}</Text>
        )}
      </TouchableOpacity>
    ),
    [],
  );

  const renderMenuOption = ({item}: {item: string}) => {
    return (
      <TouchableOpacity
        style={[styles.menuOption, item === 'Cancel' && styles.cancelOption]}
        onPress={() => {
          if (item === 'Cancel') {
            toggleMenu();
          }
        }}
        activeOpacity={0.8}>
        <Text
          style={[
            styles.menuOptionText,
            item === 'Cancel' && styles.cancelOptionText, // Custom style for "Cancel"
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Animated.View style={[styles.container]}>
      <Text style={styles.header}>React Native Communities</Text>
      <View style={{flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={groups}
          keyExtractor={item => item.id.toString()}
          renderItem={renderGroup}
          ListHeaderComponent={
            <Text style={styles.sectionHeader}>Groups you're in</Text>
          }
        />
      </View>
      <TouchableOpacity
        style={styles.addGroupButton}
        onPress={() =>
          Platform.OS === 'android' ? toggleMenu() : handleIosMenu()
        }
        activeOpacity={0.7}>
        <Icon name="plus-circle" size={24} color="#fff" />
        <Text style={styles.addGroupText}>Add Group</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.menuContainer, menuStyle]}>
        <FlatList
          data={MenuOptions}
          renderItem={renderMenuOption}
          keyExtractor={item => item}
        />
      </Animated.View>
    </Animated.View>
  );
};
export default CommunityPage;
