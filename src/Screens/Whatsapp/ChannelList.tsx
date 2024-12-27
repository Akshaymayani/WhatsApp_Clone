/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Animated as Anim,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  Easing,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {NavigationPath, RootStackParamList} from '../../types/Navigation';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {Channel} from '../../DATA/Channel';
import {ChannelListStyles} from '../../Styles/ChannelListStyles';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {RectButton} from 'react-native-gesture-handler';
import RenderChannelList from '../../components/RenderChannelList';
import {Snackbar} from 'react-native-paper';
import SwipableView from '../../utils/SwipableView';

interface ChannelItemTypes {
  id: number;
  title: string;
  verified: boolean;
  added: boolean;
  followers: number;
  category: string;
}
type ChatsNavigationProp = NavigationProp<
  RootStackParamList,
  NavigationPath.Channel
>;
type ChatsRouteProp = RouteProp<RootStackParamList, NavigationPath.Channel>;

interface Props {
  navigation: ChatsNavigationProp;
  route: ChatsRouteProp;
}
const MainHeaderHeight =
  Platform.OS === 'ios' ? 100 : Platform.OS === 'android' ? 90 : 100;
const ChannelList = ({navigation, route}: Props) => {
  const [channel] = useState(Channel);
  const [filteredChannel, setFilteredChannel] = useState(Channel);
  const [ErrorText, setErrorText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visible, setVisible] = useState(false);

  // Animation States
  const itemOpacity = useSharedValue<number>(0);
  const headerOpacity = useSharedValue<number>(1); // Track header opacity
  const headerHeight = useSharedValue<number>(0);
  const lastScrollY = useSharedValue<number>(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const scrollViewRef = useRef<FlatList>(null);
  const styles = ChannelListStyles();

  const renderChannelCategory = useCallback(
    ({item}: {item: string}) => {
      return (
        <RectButton
          style={[
            styles.categoryContainer,
            {
              ...(selectedCategory === item
                ? {backgroundColor: '#28343C'}
                : {backgroundColor: '#e5e5e5'}),
            },
          ]}
          onPress={() => handleCategoryChange(item)}>
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: '500',
                ...(selectedCategory === item
                  ? {color: '#fff'}
                  : {color: '#000'}),
              },
            ]}>
            {item}
          </Text>
        </RectButton>
      );
    },
    [selectedCategory],
  );

  const removeItemFromList = (direction: 'left' | 'right', itemId: number) => {
    const actionText = direction === 'left' ? 'Achieve' : 'Delete';
    const updatedChannel = filteredChannel.filter(item => item.id !== itemId);
    setFilteredChannel(updatedChannel);
    setErrorText(`channel ${itemId} ${actionText}d successfully`);
    setVisible(true);
  };

  const FilteredChannelList = useMemo(() => {
    if (selectedCategory === 'All') {
      return filteredChannel;
    }
    return filteredChannel.filter(item => item.category === selectedCategory);
  }, [selectedCategory, filteredChannel]);

  const renderChannelLists = useCallback(
    ({item}: {item: ChannelItemTypes}) => {
      const renderLeftActions = (progress: any, dragX: Anim.Value) => {
        // const scale = dragX.interpolate({
        //   inputRange: [0, 80],
        //   outputRange: [0, 1],
        //   // extrapolate: 'clamp',
        // });
        return (
          <RectButton style={[styles.leftAction]}>
            <Foundation name="archive" color="#fff" size={26} />
            <Animated.Text style={[styles.actionText]}>Archive</Animated.Text>
          </RectButton>
        );
      };
      const renderRightActions = () => {
        return (
          <RectButton style={styles.rightAction}>
            <Text style={styles.actionText}>Delete</Text>
            <MaterialCommunity name="delete-empty" color="#fff" size={26} />
          </RectButton>
        );
      };
      return (
        <SwipableView
          leftAction={renderLeftActions}
          rightAction={renderRightActions}
          itemId={item.id}
          handleSwipeOpen={removeItemFromList}>
          <RenderChannelList item={item} />
        </SwipableView>
      );
    },
    [filteredChannel],
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: itemOpacity.value,
    };
  });
  const animatedHeaderStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    height: headerHeight.value,
    transform: [
      {
        translateY: withTiming(
          headerOpacity.value === 1 ? 0 : -MainHeaderHeight,
        ),
      },
    ],
  }));

  const ChannelCategory: string[] = useMemo(() => {
    return [
      'All',
      ...channel.reduce<string[]>((store, acc) => {
        return store.includes(acc.category) ? store : [...store, acc.category];
      }, []),
    ];
  }, [channel]);

  const handleCategoryChange = (item: string) => {
    itemOpacity.value = withTiming(
      0,
      {duration: 200, easing: Easing.inOut(Easing.ease)},
      () => {
        runOnJS(handleCategory)(item);
        itemOpacity.value = withTiming(1, {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        });
      },
    );
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToOffset({offset: 0, animated: true});
    }
  };

  const handleCategory = (item: string) => {
    setSelectedCategory(item);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    const scrollThreshold = 50;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    if (
      currentScrollY > lastScrollY.value &&
      currentScrollY > scrollThreshold
    ) {
      headerOpacity.value = withTiming(0, {duration: 200});
      headerHeight.value = withTiming(0, {duration: 200});
    } else if (
      currentScrollY < lastScrollY.value ||
      currentScrollY <= scrollThreshold
    ) {
      headerOpacity.value = withTiming(1, {duration: 200});
      headerHeight.value = withTiming(50, {duration: 200});
    }
    scrollTimeout.current = setTimeout(() => {
      if (currentScrollY <= scrollThreshold) {
        headerOpacity.value = withTiming(1, {duration: 200});
        headerHeight.value = withTiming(60, {duration: 200});
      }
    }, 150);
    lastScrollY.value = currentScrollY;
  };

  useEffect(() => {
    const cateogry = route.params?.category;
    if (cateogry) {
      setSelectedCategory(cateogry);
    }
    navigation.setOptions({
      headerStyle: {backgroundColor: '#28343C', height: MainHeaderHeight},
      headerTintColor: '#fff',
      headerTitleAlign: 'left',
      headerTitle: 'Channel',
      //   headerStyle: {
      //     backgroundColor: '#f4511e'
      //   },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 18,
      },
      headerRight: () => {
        return (
          <View style={[styles.rightContainer, {width: 60}]}>
            <TouchableOpacity>
              <FontAwesome5 name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{marginLeft: 15}}>
          <FontAwesome6 name="arrow-left" size={21} color="#fff" />
        </TouchableOpacity>
      ),
    });
    itemOpacity.value = withTiming(1, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
  }, []);

  useEffect(() => {
    if (ErrorText) {
      setVisible(true);
    }
  }, [ErrorText]);
  return (
    <View style={{flex: 1}}>
      <Animated.View style={[animatedHeaderStyle, styles.headerScrollbar]}>
        <FlatList
          keyExtractor={item => item.toString()}
          data={ChannelCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderChannelCategory}
        />
      </Animated.View>

      <Animated.View style={[animatedStyle, {flex: 1}]}>
        <Animated.FlatList
          data={FilteredChannelList}
          ref={scrollViewRef}
          renderItem={renderChannelLists}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: 20}}
          itemLayoutAnimation={LinearTransition}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />
      </Animated.View>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(!visible)}
        action={{
          label: 'Cancel',
          onPress: () => {
            setVisible(false);
          },
        }}>
        {ErrorText}
      </Snackbar>
    </View>
  );
};

export default ChannelList;
