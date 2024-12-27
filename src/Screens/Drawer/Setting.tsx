/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  Image,
  ImageBackground,
  Share,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DrawerParamList, NavigationPath} from '../../types/Navigation';
import {NavigationProp, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';

import {FlatList} from 'react-native-gesture-handler';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {SettingPageStyles} from '../../Styles/SettingPageStyles';
import {StorageKey} from '../../types/StorageKeyTypes';
import {storage} from '../../mmkv/MmkvStorage';

const modalIconItem = [
  {icon: 'Fontisto', name: 'Wallet', iconname: 'wallet'},
  {icon: 'MaterialIcons', name: 'Setting', iconname: 'settings'},
  {
    icon: 'MaterialIcons',
    name: 'Notification',
    iconname: 'notifications-active',
  },
];

interface Props {
  navigation: NavigationProp<DrawerParamList, NavigationPath.Setting>;
}
const Setting = ({navigation}: Props) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [userInfo, setUserInfo] = useState<any>();
  const isFocused = useIsFocused();
  const styles = SettingPageStyles();

  const modalDesc = useMemo(() => {
    const truncate = (name: string) =>
      name.length > 15 ? `${name.substring(0, 12)}...` : name;
    if (userInfo) {
      return [
        {
          Key: 'Name',
          Value: `${truncate(userInfo.firstName)} ${truncate(
            userInfo.lastName,
          )}`,
        },
        {Key: 'Location', Value: 'Ahmedabad'},
        {Key: 'Phone No.', Value: `${userInfo.phoneNumber}`},
        {Key: 'Birth Date', Value: `${userInfo.DOB}`},
        {Key: 'Notification', Value: 'on'},
      ];
    }
    return [
      {Key: 'Name', Value: 'Akshay Mayani'},
      {Key: 'Location', Value: 'Ahmedabad'},
      {Key: 'Phone No.', Value: '9512076316'},
      {Key: 'Designation', Value: 'ReactNative Developer'},
      {Key: 'Notification', Value: 'on'},
    ];
  }, [userInfo]);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | Application is Developed by Developer Akshay Mayani',
        url: 'https://github.com/AkshayMayani',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          Alert.alert('message shared with : ', result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        // Alert.alert('You have not Share.');
        console.log('The Message is not share');
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const renderModalItem = ({item}: {item: any}) => {
    return (
      <View style={styles.miditem} key={item.Key}>
        <Text style={styles.desc_text}>{item.Key}</Text>
        {item.Key === 'Notification' ? (
          <Switch
            trackColor={{false: '#767577', true: '#365DE9'}}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            // disabled
          />
        ) : (
          <Text numberOfLines={1} style={styles.desc_text}>
            {item.Value}
          </Text>
        )}
      </View>
    );
  };
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    if (isFocused === true) {
      const userdata = storage.getString(StorageKey.USER);
      console.log({userdata});
      if (userdata != null || userdata !== undefined) {
        console.log({userdata});
        setUserInfo(JSON.parse(userdata));
      } else {
        setUserInfo(null);
      }
    }
  }, [navigation, isFocused]);
  return (
    <React.Fragment>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <View style={styles.maincontainer}>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}>
            <MaterialIcons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.button}>
            <MaterialIcons name="share" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          <ImageBackground
            source={require('../../assets/banner.jpeg')}
            style={styles.headerImg}
            resizeMode="cover"
            blurRadius={10}>
            <View style={styles.content}>
              <Image
                source={require('../../assets/Profile.jpeg')}
                style={styles.profileImg}
                resizeMode="contain"
              />
              <Text style={[styles.desc, {fontSize: 18}]}>
                {userInfo
                  ? `${userInfo.firstName} ${userInfo.lastName}`
                  : 'Akshay Mayani'}
              </Text>
              <Text style={[styles.desc, {fontSize: 16}]}>
                {userInfo ? `${userInfo.email}` : 'akshaymayani507@gmail.com'}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.modal}>
          <View>
            <View style={styles.modalTop}>
              {modalIconItem.map(item => {
                return (
                  <TouchableOpacity
                    key={item.iconname}
                    activeOpacity={0.6}
                    style={[styles.modalTopItem, {flex: 1}]}>
                    {item.icon === 'MaterialIcons' ? (
                      <MaterialIcons
                        color="#365DE9"
                        size={23}
                        name={item.iconname}
                      />
                    ) : (
                      <Fontisto
                        color="#365DE9"
                        size={23}
                        name={item.iconname}
                      />
                    )}
                    <Text style={[styles.footertext, styles.modaltoptext]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={styles.modal_mid}>
            <FlatList
              data={modalDesc}
              renderItem={renderModalItem}
              scrollEnabled={false}
              keyExtractor={item => item.Key.toString()}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerwrapper}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(NavigationPath.LoginForm, {isUpdate: true})
            }>
            <Text style={styles.footertext}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </React.Fragment>
  );
};

export default Setting;
