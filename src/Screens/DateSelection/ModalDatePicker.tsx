import Animated, {BounceInLeft, SlideOutLeft} from 'react-native-reanimated';
import React, {useState} from 'react';
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';

const ModalDatePicker = ({
  control,
  placeholder,
  label,
  name,
  rules,
  left,
}: any) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({field: {onChange, value}, fieldState: {error}}) => {
          return (
            <React.Fragment>
              <TouchableOpacity
                activeOpacity={0.7}
                style={[
                  styles.wrapper,
                  error ? {borderColor: 'red'} : {borderColor: 'grey'},
                ]}
                onPress={() => setOpen(true)}>
                {left && <View style={styles.iconWrapper}>{left}</View>}
                <Text
                  style={[
                    styles.placeholderText,
                    error ? {color: 'red'} : value ? {color: '#000'} : {},
                  ]}>
                  {value ? value : placeholder}
                </Text>

                <DatePicker
                  date={date}
                  maximumDate={new Date()}
                  title={placeholder}
                  mode="date"
                  modal
                  open={open}
                  onConfirm={dates => {
                    handleClose();
                    const formattedDate = dayjs(dates).format('DD-MM-YYYY');
                    setDate(dates);
                    onChange(formattedDate);
                  }}
                  onCancel={handleClose}
                />
              </TouchableOpacity>
              {error && (
                <Animated.View entering={BounceInLeft} exiting={SlideOutLeft}>
                  <Text style={styles.errorText}>
                    {error.message || 'Error'}
                  </Text>
                </Animated.View>
              )}
            </React.Fragment>
          );
        }}
      />
    </View>
  );
};

export default ModalDatePicker;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  wrapper: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  iconWrapper: {
    marginRight: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 15,
    // color: '#000',
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 11,
  },
});
