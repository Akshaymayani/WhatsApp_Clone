/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import { Alert, BackHandler, Platform, StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BottomTabParamList, DrawerParamList, NavigationPath, RootStackParamList} from '../../types/Navigation';
import { CompositeNavigationProp, NavigationProp } from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';

import Calls from '../Tab-Navigation/Calls';
import Chats from '../Tab-Navigation/Chats';
import Communities from '../Tab-Navigation/Communities';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { RootState } from '../../Redux/Store';
import Status from '../Tab-Navigation/Status';
import { useSelector } from 'react-redux';

type WhatsAppHomeNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList, NavigationPath.WhatsApp>,
    NavigationProp<RootStackParamList>
  >
>;

interface Props {
  navigation: WhatsAppHomeNavigationProp;
}

function WhatsAppHome({ navigation }:Props) {
  const focusedPage = useSelector((store:RootState) => store.header.item);
  const focusedPageRef = useRef(focusedPage);
  const colorSchema = useColorScheme();
  useEffect(() => {
    focusedPageRef.current = focusedPage;
  }, [focusedPage]);
  function handlePress(item: string) {
    console.log(item);
  }
  useEffect(() => {
    navigation.setOptions({
      headerStyle: { backgroundColor: '#28343C', height: Platform.OS === 'android' ? 95 : 110 },
      headerTintColor: '#fff',
      headerTitleAlign: 'left',
      headerRight: () => {
        return (
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => handlePress('camera')}>
              <FontAwesome5 name="camera" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('search')}>
              <FontAwesome5 name="search" size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress('more')} style={{paddingHorizontal:4}}>
              <Fontisto name="more-v-a" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        );
      },
      headerTitleStyle: {
        fontSize: 20,
      },
    });
  }, [navigation]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    const beforeRemoveListener = navigation.addListener('beforeRemove', (e: any) => {
      e.preventDefault();
      Alert.alert('Hold on!', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'YES',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
    });
    return () => {
      backHandler.remove();
      beforeRemoveListener();
    };
  }, [navigation]);




  const Tab = createBottomTabNavigator<BottomTabParamList>();
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={colorSchema === 'dark' ? 'dark-content' : 'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <Tab.Navigator
        initialRouteName="Chat"
        screenOptions={({route}) => ({
          tabBarStyle: {
            height: Platform.OS === 'ios' ?  80 : 60,
            width:'100%',
            backgroundColor: '#28343C',
            // paddingTop:5,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            paddingBottom:Platform.OS === 'android' ?  4 : 25,
            overflow:'hidden',
          },
          tabBarLabelStyle: {
            fontSize: 15,
          },
          headerShown:false,
          // tabBarIconStyle: {
          // },
          // tabBarAccessibilityLabel: true,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({color}) => {
            let iconName;
            switch (route.name) {
              case 'Chat':
                iconName = 'comment';
                break;
              case 'Status':
                iconName = 'radiation-alt';
                break;
              case 'Communitites':
                iconName = 'users';
                break;
              case 'Calls':
                iconName = 'portrait';
                break;
              default:
                iconName = '';
                break;
            }
            return <Icon name={iconName} size={23} color={color} />;
          },
        })}
          >
        <Tab.Screen
          name="Chat"
          component={Chats}
        />
        <Tab.Screen
          name="Status"
          component={Status}
        />
        <Tab.Screen
          name="Communitites"
          component={Communities}
          options={() => ({tabBarBadge: 3})}
        />
        <Tab.Screen
          name="Calls"
          component={Calls}
        />
      </Tab.Navigator>
    </View>
  );
}

export default WhatsAppHome;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    width: 130,
  },
});
