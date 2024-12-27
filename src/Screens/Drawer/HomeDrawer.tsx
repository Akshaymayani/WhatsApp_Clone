import {Animated, Image, StyleSheet, Text, View} from 'react-native';
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerParamList, NavigationPath} from '../../types/Navigation';

import AdvanceLoginForm from './AdvanceLoginForm';
import {DrawerActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {LoginContext} from '../../Context/LoginProvider';
import React from 'react';
import Setting from './Setting';
import {TouchableOpacity} from 'react-native';
import WhatsAppHome from '../Whatsapp/WhatsAppHome';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {useContext} from 'react';

const AnimatedGradient = Animated.createAnimatedComponent(LinearGradient);
function HomeDrawer() {
  const {user, handleUserData} = useContext(LoginContext);
  const Drawer = createDrawerNavigator<DrawerParamList>();
  function CustomDrawerContent(props: DrawerContentComponentProps) {
    const handleLogout = () => {
      if (user) {
        props.navigation.dispatch(DrawerActions.closeDrawer());
        handleUserData(null);
      } else {
        props.navigation.navigate(NavigationPath.LoginForm, {isUpdate: false});
      }
    };
    return (
      <LinearGradient
        colors={['#131A23', '#073832']}
        style={{flex: 1}}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1.5}}
        locations={[0, 1]}>
        <DrawerContentScrollView {...props} scrollEnabled={false}>
          <View style={[styles.drawerContent]}>
            <View style={styles.drawerHeader}>
              <AnimatedGradient
                colors={['skyblue', 'green', 'yellowgreen']}
                start={{x: 0, y: 0}}
                end={{x: 0, y: 1}}
                style={styles.iconWrapper}>
                <Image
                  source={require('../../assets/userProfile.png')}
                  resizeMode="contain"
                  style={styles.iconImage}
                />
              </AnimatedGradient>
              <View style={user ? {flex: 1, gap: 4} : {}}>
                {user ? (
                  <>
                    <Text numberOfLines={1} style={styles.drawerHeaderText}>
                      {`${user.firstName} ${user.lastName}`}
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={[styles.drawerHeaderText, {marginRight: 10}]}>
                      {user.email}
                    </Text>
                  </>
                ) : (
                  <Text
                    numberOfLines={1}
                    style={[
                      styles.drawerHeaderText,
                      {marginLeft: 10, fontSize: 18},
                    ]}>
                    Guest
                  </Text>
                )}
              </View>
            </View>
            <DrawerItemList {...props} />
            <TouchableOpacity
              style={styles.drawerFooter}
              onPress={handleLogout}>
              <Text
                style={[
                  styles.drawerFooterText,
                  user ? {color: 'red'} : {color: '#fff'},
                ]}>
                {user ? 'Logout' : 'SignIn'}
              </Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
      </LinearGradient>
    );
  }
  return (
    <Drawer.Navigator
      initialRouteName={NavigationPath.WhatsApp}
      screenOptions={{
        drawerType: 'front',
        drawerActiveBackgroundColor: '#525c62',
        drawerActiveTintColor: '#fff',
        // drawerInactiveBackgroundColor: '#1C232B',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          color: '#fff',
          fontSize: 17,
        },
        drawerStyle: {
          width: 300,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name={NavigationPath.WhatsApp} component={WhatsAppHome} />
      <Drawer.Screen
        name={NavigationPath.LoginForm}
        component={AdvanceLoginForm}
        initialParams={{isUpdate: false}}
        options={{
          headerTitle: 'Login Form',
          headerStyle: {backgroundColor: '#0D2723'},
          headerTintColor: '#fff',
        }}
      />
      <Drawer.Screen
        name={NavigationPath.Setting}
        component={Setting}
        options={{
          headerShadowVisible: false,
          headerTitle: 'Setting',
          headerStyle: {
            backgroundColor: '#3043e8',
          },
          headerTintColor: 'white',
        }}
      />
    </Drawer.Navigator>
  );
}

export default HomeDrawer;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#a8a8a8',
    borderRadius: 100,
    marginHorizontal: 10,
    marginBottom: 10,
    marginTop: 25,
    height: 70,
    paddingLeft: 8,
    paddingRight: 8,
    gap: 4,
  },
  drawerHeaderText: {
    fontSize: 15,
    color: '#28343C',
    textAlign: 'left',
    fontWeight: '500',
  },
  drawerItem: {
    marginVertical: 5,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#fff',
  },
  iconWrapper: {
    height: 58,
    width: 58,
    borderRadius: 28.5,
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 2,
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 4,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#131a23',
    borderRadius: 27.5,
  },
  drawerFooter: {
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 8,
    width: '30%',
    height: 40,
    paddingLeft: 10,
    fontSize: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  drawerFooterText: {
    fontWeight: '600',
    fontSize: 17,
  },

  rightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
    width: 130,
  },
});
