/* eslint-disable react-native/no-inline-styles */
import Animated, {BounceInLeft, SlideOutLeft} from 'react-native-reanimated';
import {Controller, RegisterOptions} from 'react-hook-form';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';

interface CustomFormProps {
  control: any;
  placeholder?: string;
  name: string;
  secureTextEntry?: boolean;
  right?: React.ReactNode;
  left?: React.ReactNode;
  label?: string;
  rules?: RegisterOptions;
  keyboardType?: KeyboardTypeOptions;
}

const CustomForm = ({
  control,
  placeholder,
  name,
  rules = {},
  secureTextEntry,
  keyboardType,
  right,
  left,
  label,
  ...props
}: CustomFormProps) => {
  return (
    <View style={styles.inputWrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
          <>
            <View
              style={[
                styles.inputContainer,
                error ? styles.errorBorder : styles.defaultBorder,
              ]}>
              {left && (
                <TouchableOpacity style={[styles.rightIcon, {marginRight: 15}]}>
                  {left}
                </TouchableOpacity>
              )}
              <TextInput
                {...props}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                onBlur={onBlur}
                keyboardType={keyboardType || 'default'}
                onChangeText={onChange}
                value={value}
                style={styles.textInput}
                placeholderTextColor="#6c757d"
              />
              {right && (
                <TouchableOpacity style={styles.rightIcon}>
                  {right}
                </TouchableOpacity>
              )}
            </View>
            {error && (
              <Animated.View
                entering={BounceInLeft}
                exiting={SlideOutLeft}
                style={{marginTop: 6}}>
                <Text style={styles.errorText}>{error.message || 'Error'}</Text>
              </Animated.View>
            )}
          </>
        )}
      />
    </View>
  );
};

export default CustomForm;

const styles = StyleSheet.create({
  inputWrapper: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 47,
    elevation: 2, // For slight shadow
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingHorizontal: 4,
  },
  rightIcon: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorBorder: {
    borderWidth: 1,
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    // marginTop: 5,
  },
});
