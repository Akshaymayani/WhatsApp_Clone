/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  Animated,
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NavigationPath, RootStackParamList} from '../../types/Navigation';
import React, {useEffect, useRef, useState} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp} from '@react-navigation/native';
import {SubscribedChannelStyles} from '../../Styles/SubscribedChannelStyles';

const data: {
  id: string;
  title: string;
}[] = Array.from({length: 20}).map((_, index) => ({
  id: `item-${index}`,
  title: `Image ${index + 1}`,
}));
const iosHeight = 110;
const androidHeight = 100;
type SubscribedChannelNavigationProps = NavigationProp<
  RootStackParamList,
  NavigationPath.SubscribedChannel
>;

type Props = {
  navigation: SubscribedChannelNavigationProps;
};
const SubscribedChannel = ({navigation}: Props) => {
  const scrolling = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  // State for status bar style
  const [statusBarStyle, setStatusBarStyle] = useState<
    'light-content' | 'dark-content'
  >('dark-content');
  const styles = SubscribedChannelStyles();
  const headerTranslateY = scrolling.interpolate({
    inputRange: [0, Platform.OS === 'android' ? androidHeight : iosHeight],
    outputRange: [Platform.OS === 'android' ? -androidHeight : -iosHeight, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    const listener = scrolling.addListener(({value}) => {
      if (value > 20) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      if (value > 50 && statusBarStyle !== 'light-content') {
        setStatusBarStyle('light-content');
      } else if (value <= 50 && statusBarStyle !== 'dark-content') {
        setStatusBarStyle('dark-content');
      }
    });

    return () => {
      scrolling.removeListener(listener);
    };
  }, [scrolling, fadeAnim, statusBarStyle]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [bounceAnim]);
  const renderItem = ({item}: {item: {id: string; title: string}}) => (
    <View style={styles.card}>
      <Image source={require('../../assets/Dp.jpeg')} style={styles.image} />
      <View style={styles.channelDesc}>
        <Text style={styles.title}>{item.title}</Text>
        <Icon name="arrow-forward" size={24} color="#fff" />
      </View>
    </View>
  );

  const HeaderComponent = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Subscribed Channels</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={statusBarStyle}
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{translateY: headerTranslateY}],
          },
        ]}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Subscribed Channel</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NavigationPath.HomeDrawer, {
                screen: NavigationPath.WhatsApp,
              })
            }>
            <Icon name="manage-accounts" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Scroll Down Indicator */}
      <Animated.View style={[styles.scrollIndicator, {opacity: fadeAnim}]}>
        <Animated.View
          style={[
            styles.scrollContainer,
            {
              transform: [{translateY: bounceAnim}],
            },
          ]}>
          <Text style={styles.scrollText}>Scroll Down</Text>
          <Icon name="keyboard-arrow-down" size={32} color="#000" />
        </Animated.View>
      </Animated.View>

      <Animated.FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={HeaderComponent}
        contentContainerStyle={{paddingTop: 50}}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrolling,
                },
              },
            },
          ],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default SubscribedChannel;
