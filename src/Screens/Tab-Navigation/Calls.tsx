/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Image,
  LayoutChangeEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import {CallData} from '../../DATA/Call';
import {CallPageStyles} from '../../Styles/CallPageStyles';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

interface tabLabelProps {
  all: string;
  missed: string;
  arrived: string;
  dialed: string;
}
interface CallDataProps {
  id: string;
  name: string;
  lastCall: string;
  missed: boolean;
  voiceCall: boolean;
  image: string;
  callType: string;
}
const tabs: Array<keyof tabLabelProps> = ['all', 'missed', 'arrived', 'dialed'];
const tabLabels: tabLabelProps = {
  all: 'All',
  missed: 'Missed',
  arrived: 'Arrived',
  dialed: 'Dialed',
};

const Calls = () => {
  const [selectedTab, setSelectedTab] = useState<keyof tabLabelProps>('all');
  const animationValue = useSharedValue(0);
  const [tabWidths, setTabWidths] = useState(Array(tabs.length).fill(0));
  const [callsData, setCallsData] = useState(CallData);
  const styles = CallPageStyles();

  const indicatorStyle = useAnimatedStyle(() => {
    if (tabWidths.some(width => width === 0)) {
      return {};
    }

    const translateX = interpolate(
      animationValue.value,
      tabs.map((_, index) => index),
      tabWidths.map((width, index) => {
        const offset = tabWidths.slice(0, index).reduce((sum, w) => sum + w, 0);
        return offset;
      }),
    );

    const currentWidth = interpolate(
      animationValue.value,
      tabs.map((_, index) => index),
      tabWidths,
    );

    return {
      transform: [{translateX}],
      width: currentWidth,
    };
  });
  const handleTabLayout = (e: LayoutChangeEvent, index: number) => {
    const {width} = e.nativeEvent.layout;
    setTabWidths(prevWidths => {
      const newWidths = [...prevWidths];
      newWidths[index] = width;
      return newWidths;
    });
  };

  const renderTab = (item: keyof tabLabelProps, index: number) => (
    <TouchableOpacity
      key={item}
      onLayout={e => handleTabLayout(e, index)}
      style={styles.tab}
      onPress={() => setSelectedTab(item)}
      activeOpacity={0.8}>
      <Text
        style={[
          styles.tabText,
          selectedTab === item && styles.selectedTabText,
        ]}>
        {tabLabels[item]}
      </Text>
    </TouchableOpacity>
  );

  const filterCalls = (tab: string) => {
    switch (tab) {
      case 'missed':
        return CallData.filter(call => call.callType === 'missed');
      case 'arrived':
        return CallData.filter(call => call.callType === 'received');
      case 'dialed':
        return CallData.filter(call => call.callType === 'dialed');
      default:
        return CallData;
    }
  };

  const renderItem = useCallback(
    ({item}: {item: CallDataProps}) => {
      return (
        <View style={styles.callItem}>
          <Image
            source={require('../../assets/user.jpeg')}
            style={styles.avatar}
          />
          <View style={styles.callDetails}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.callTime}>{item.lastCall}</Text>
            <Text style={[styles.callType, item.missed ? {color: 'red'} : {}]}>
              {item.callType === 'missed'
                ? 'Missed Call'
                : item.callType === 'received'
                ? 'Received Call'
                : 'Dialed Call'}
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={{padding: 2}}>
            <Icon
              name={item.voiceCall ? 'call' : 'videocam'}
              size={24}
              color="#3d484f"
            />
          </TouchableOpacity>
        </View>
      );
    },
    [selectedTab],
  );
  useEffect(() => {
    animationValue.value = withTiming(tabs.indexOf(selectedTab), {
      duration: 300,
    });
    setCallsData(filterCalls(selectedTab));
  }, [selectedTab]);
  return (
    <View style={styles.container}>
      {/* Custom Tab Bar */}
      <View style={styles.tabBar}>
        {/* Render all tabs dynamically */}
        {tabs.map(renderTab)}
        <Animated.View style={[styles.indicator, indicatorStyle]} />
      </View>
      <View style={{width: '100%', flex: 1}}>
        <FlatList
          data={callsData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default Calls;
