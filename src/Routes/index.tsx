import {NavigationPath, RootStackParamList} from '../types/Navigation';

import Channel from '../Screens/Whatsapp/ChannelList';
import ContactList from '../Screens/Whatsapp/ContactList';
import HomeDrawer from '../Screens/Drawer/HomeDrawer';
import IntroSlider from '../Screens/IntroSlider/AppIntroSlider';
import MasterChannelList from '../Screens/Whatsapp/MasterChannelList';
import {NavigationContainer} from '@react-navigation/native';
import PersonalChat from '../Screens/Whatsapp/PersonalChat';
import React from 'react';
import {StorageKey} from '../types/StorageKeyTypes';
import SubscribedChannel from '../Screens/Whatsapp/SubscribedChannel';
import {createStackNavigator} from '@react-navigation/stack';
import {storage} from '../mmkv/MmkvStorage';

const MainNavigation = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  const datas = storage.getBoolean(StorageKey.VISIBLEINTRO);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          datas === false
            ? NavigationPath.HomeDrawer
            : NavigationPath.AppIntroSlider
        }>
        <Stack.Group>
          <Stack.Screen
            name={NavigationPath.HomeDrawer}
            component={HomeDrawer}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={NavigationPath.AppIntroSlider}
            component={IntroSlider}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={NavigationPath.Personalchat}
            component={PersonalChat}
          />
          <Stack.Screen
            name={NavigationPath.Channel}
            component={Channel}
            options={{headerTitle: 'Channels'}}
          />
          <Stack.Screen
            name={NavigationPath.MasterChannel}
            component={MasterChannelList}
            options={{
              headerTitle: 'Channel List',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#303B45',
              },
              headerBackTitle: 'WhatsApp',
            }}
          />
          <Stack.Screen
            name={NavigationPath.SubscribedChannel}
            component={SubscribedChannel}
            options={{headerShown: false}}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            name={NavigationPath.ContactList}
            component={ContactList}
            options={{
              headerBackTitle: 'WhatsApp',
              headerMode: 'screen',
              headerTintColor: '#fff',
              headerStyle: {
                backgroundColor: '#303B45',
              },
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
