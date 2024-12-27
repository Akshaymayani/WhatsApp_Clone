import {ChatItemTypes} from './WhatsappChatTypes';
import {NavigatorScreenParams} from '@react-navigation/native';

export type RootStackParamList = {
  [NavigationPath.HomeDrawer]: NavigatorScreenParams<DrawerParamList>;
  [NavigationPath.AppIntroSlider]: undefined;
  [NavigationPath.Personalchat]: {userId: ChatItemTypes};
  [NavigationPath.Channel]: {category?: string};
  [NavigationPath.MasterChannel]: undefined;
  [NavigationPath.SubscribedChannel]: undefined;
  [NavigationPath.ContactList]: undefined;
  [NavigationPath.Setting]: undefined;
  // [NavigationPath.LoginForm]: {isUpdate: boolean};
};

export type BottomTabParamList = {
  Chat: undefined;
  Status: undefined;
  Communitites: undefined;
  Calls: undefined;
};
// Navigation.ts
export type DrawerParamList = {
  [NavigationPath.WhatsApp]: undefined;
  [NavigationPath.LoginForm]: {isUpdate: boolean};
  [NavigationPath.Setting]: undefined;
};

export enum NavigationPath {
  HomeDrawer = 'Home',
  AppIntroSlider = 'AppIntroSlider',
  Animation = 'Animation',
  Personalchat = 'personalchat',
  Channel = 'channel',
  MasterChannel = 'MasterChannel',
  Newchat = 'newchat',
  WhatsApp = 'WhatsApp',
  LoginForm = 'LoginForm',
  Setting = 'Setting',
  Slider = 'Slider',
  ContactList = 'ContactList',
  SubscribedChannel = 'SubscribedChannel',
}
