/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {CalendarList} from 'react-native-calendars';
import dayjs from 'dayjs';

/* eslint-disable prettier/prettier */
/* eslint-disable semi */



dayjs.extend(require('dayjs/plugin/isBetween'));
const RoundTripDatePicker = ({ navigation }) => {
  const minDate = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  const maxDate = dayjs().add(366, 'day').format('YYYY-MM-DD');
  const [SelectedDate, SetSelectedDate] = useState({
    DepartureDate: undefined,
    ReturnDate: undefined,
  });

  const handleSubmit = () => {
    const departureDateFormatted = dayjs(SelectedDate.DepartureDate?.dateString).format('DD/MM/YYYY');
    const returnDateFormatted = dayjs(SelectedDate.ReturnDate?.dateString).format('DD/MM/YYYY');
    console.log({ departureDateFormatted, returnDateFormatted });
    Alert.alert(
      'Journey Date',
      `Departure: ${departureDateFormatted}\nReturn: ${returnDateFormatted}`,
      [
        {
          text: 'OK', onPress: () => {
            SetSelectedDate({
              DepartureDate: undefined,
              ReturnDate: undefined,
            });
            navigation.goBack();
          }
        },
      ]
    );
  }

  const getSelectionType = date => {
    const startDate = SelectedDate.DepartureDate?.dateString;
    const EndDate = SelectedDate.ReturnDate?.dateString;
    if (date && startDate) {
      if (date === startDate) {
        return 'StartDate';
      } else if (date === EndDate) {
        return 'EndDate';
      } else if (startDate && EndDate) {
        if (dayjs(date).isBetween(startDate, EndDate, 'day')) {
          return 'BetweenDate';
        }
      } else {
        return 'CommonDate';
      }
    } else {
      return 'CommonDate';
    }
  };

  const HandleDateSelection = dateobj => {
    if (SelectedDate.DepartureDate && SelectedDate.ReturnDate) {
      SetSelectedDate((prev) => ({ ...prev, DepartureDate: dateobj, ReturnDate: undefined }));
    } else if (SelectedDate.DepartureDate) {
      if (
        dayjs(SelectedDate.DepartureDate.dateString).isBefore(
          dayjs(dateobj?.dateString),
        )
      ) {
        console.log('return Date selected --> ');
        SetSelectedDate((prev) => ({ ...prev, ReturnDate: dateobj }));
      } else {
        console.log('departure Date selected --> ');
        SetSelectedDate((prev) => ({ ...prev, DepartureDate: dateobj, ReturnDate: undefined }));
      }
    } else {
      SetSelectedDate((prev) => ({ ...prev, DepartureDate: dateobj, ReturnDate: undefined }));
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable style={{ marginRight: 20 }} onPress={handleSubmit}>
          <Text style={{ color: '#000' }}>Done</Text>
        </Pressable>
      ),
    })

  }, [navigation,SelectedDate])

  return (
    <View>
      <CalendarList
        dayComponent={props => {
          const { date } = props;
          const ISDisabled = !dayjs(date?.dateString).isBetween(
            minDate,
            maxDate,
            'day',
          );
          const selectionType = getSelectionType(date?.dateString);
          // eslint-disable-next-line keyword-spacing,
          return (
            <Pressable
              disabled={ISDisabled}
              style={({ pressed }) => {
                return selectionType === 'StartDate' ? [styles.dateBox, styles.startDate] : selectionType === 'EndDate' ? [styles.dateBox, styles.EndDate] : selectionType === 'BetweenDate' || pressed ? [styles.dateBox, styles.BetweenDate] : ISDisabled ? [styles.dateBox, styles.DisableDate] : [styles.dateBox, styles.NormalDate]
              }}
              onPress={() => HandleDateSelection(date)}
            >
              <Text> {date?.day} </Text>
            </Pressable>
          )
        }}

        current={SelectedDate.DepartureDate?.dateString}
        minDate={dayjs().format('YYYY-MM-DD')}
        maxDate={dayjs().add(365, 'day').format('YYYY-MM-DD')}
        pastScrollRange={0}
        futureScrollRange={12}
        scrollEnabled={true}
        horizontal={false}
      />
    </View>
  );
};

export default RoundTripDatePicker;

const styles = StyleSheet.create({

  SelectedDateBox: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  CalendarBox: {
    width: '100%',
    height: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dateBox: {
    width: '100%',
    height: 55,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
  },
  startDate: {
    backgroundColor: '#80a8bf',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  EndDate: {
    backgroundColor: '#80a8bf',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  BetweenDate: {
    backgroundColor: '#bce0f3',
  },
  NormalDate: {
    backgroundColor: 'white',
  },
  DisableDate: {
    backgroundColor: '#f0f0f1',
  },
});
