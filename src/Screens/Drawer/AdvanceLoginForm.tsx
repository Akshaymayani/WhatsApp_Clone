/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {DrawerParamList, NavigationPath} from '../../types/Navigation';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
} from '@react-navigation/native';
import React, {useContext, useEffect, useRef, useState} from 'react';

import CustomForm from '../../components/CustomForm';
import {Image} from 'react-native';
import InteractiveButton from '../../components/InteractiveButton';
import LinearGradient from 'react-native-linear-gradient';
import {LoginContext} from '../../Context/LoginProvider';
import ModalDatePicker from '../DateSelection/ModalDatePicker';
import {StorageKey} from '../../types/StorageKeyTypes';
import {TextInput} from 'react-native-paper';
import {storage} from '../../mmkv/MmkvStorage';
import {useForm} from 'react-hook-form';

type LoginFormNavigationProps = NavigationProp<
  DrawerParamList,
  NavigationPath.LoginForm
>;

type Props = {
  navigation: LoginFormNavigationProps;
  route: RouteProp<DrawerParamList, NavigationPath.LoginForm>;
};

const AdvanceLoginForm = ({navigation, route}: Props) => {
  const [ShowPassword, setShowPassword] = useState<boolean>(false);
  const {handleUserData} = useContext(LoginContext);
  const isFocused = useIsFocused();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      DOB: '',
      password: '',
    },
  });
  function resetData() {
    reset({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      DOB: '',
      password: '',
    });
  }
  const onSubmit = (data: any) => {
    Alert.alert('Success ✔️', 'User Information Updated Successfully', [
      {
        text: 'ok',
        onPress: () => {
          if (route.params?.isUpdate) {
            navigation.setParams({isUpdate: undefined});
          }
          navigation.navigate(NavigationPath.Setting);
        },
        style: 'cancel',
      },
    ]);
    handleUserData(data);
    resetData();
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  useEffect(() => {
    if (isFocused) {
      const {isUpdate} = route.params;
      const UserInfo = storage.getString(StorageKey.USER);
      const parsedUserInfo = UserInfo ? JSON.parse(UserInfo) : null;
      console.log({isUpdate, parsedUserInfo});
      if (isUpdate && parsedUserInfo) {
        // Bind UserInfo into the form
        reset({
          firstName: parsedUserInfo.firstName,
          lastName: parsedUserInfo.lastName,
          email: parsedUserInfo.email,
          phoneNumber: parsedUserInfo.phoneNumber,
          DOB: parsedUserInfo.DOB,
          password: parsedUserInfo.password,
        });
        return;
      } else {
        resetData();
      }
    } else {
      resetData();
    }
  }, [route.params]);

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <LinearGradient
        colors={['#04211e', '#073832', '#51736f']}
        style={{flex: 1}}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 30}}>
            <View style={{alignItems: 'center', marginVertical: 20}}>
              <View style={styles.logoWrapper}>
                <Image
                  style={styles.logoImage}
                  source={require('../../assets/logoIcon.png')}
                  resizeMode="cover"
                />
              </View>
            </View>

            <Animated.View style={[styles.formContainer, {opacity: fadeAnim}]}>
              <CustomForm
                control={control}
                placeholder="Enter your FirstName"
                label="Enter FirstName"
                name="firstName"
                rules={{
                  required: 'First Name is Required',
                  maxLength: {
                    value: 20,
                    message: 'First name must be under 20 characters',
                  },
                }}
                left={<TextInput.Icon icon={'account'} />}
              />
              <CustomForm
                control={control}
                placeholder="Enter your LastName"
                label="Enter LastName"
                name="lastName"
                rules={{
                  required: 'Last Name is Required',
                  maxLength: {
                    value: 20,
                    message: 'Last name must be under 20 characters',
                  },
                }}
                left={<TextInput.Icon icon={'account'} />}
              />
              <CustomForm
                control={control}
                placeholder="Enter your Email"
                label="Enter Email"
                name="email"
                rules={{
                  required: 'Email is Required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                left={<TextInput.Icon icon={'email'} />}
              />
              <CustomForm
                control={control}
                placeholder="Enter your phoneNumber"
                label="Enter Number"
                name="phoneNumber"
                keyboardType="numeric"
                rules={{
                  required: 'Phone number is Required',
                  minLength: {value: 10, message: 'Minimum length is 10'},
                  maxLength: {value: 10, message: 'Maximum length is 10'},
                }}
                left={<TextInput.Icon icon={'cellphone'} />}
              />
              <ModalDatePicker
                placeholder="Select Your BirthDate"
                label="Select BirthDate"
                rules={{required: 'Please Select DOB '}}
                name="DOB"
                control={control}
                left={<TextInput.Icon icon={'calendar-range'} />}
              />
              <CustomForm
                control={control}
                placeholder="Enter your password"
                secureTextEntry={!ShowPassword}
                label="Enter password"
                name="password"
                right={
                  <TextInput.Icon
                    icon={!ShowPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!ShowPassword)}
                  />
                }
                left={<TextInput.Icon icon={'lock'} />}
                rules={{
                  required: 'Password is Required',
                  minLength: {
                    value: 6,
                    message: 'Password Length is at least 6',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,18}$/,
                    message:
                      'Password must include a digit, uppercase, and lowercase letters',
                  },
                }}
              />
              <View style={{marginTop: 20}}>
                <InteractiveButton
                  btnText="Submit Form"
                  onSubmit={handleSubmit(onSubmit)}
                />
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>
    </>
  );
};

export default AdvanceLoginForm;

const styles = StyleSheet.create({
  logoWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  logoImage: {
    width: '160%',
    height: '160%',
  },
  formContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 12,
  },
});
