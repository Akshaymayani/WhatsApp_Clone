/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-shadow */
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import DatePicker from 'react-native-date-picker';
import {Divider} from 'react-native-paper';
import {NavigationPath} from '../../types/Navigation';
import {ScrollView} from 'react-native-gesture-handler';

function Modal() {
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Modal Component</Text>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button title="Open" onPress={() => setOpen(true)} />
        </View>
        <DatePicker
          date={date}
          minimumDate={new Date('2023-01-01')}
          maximumDate={new Date('2024-12-31')}
          modal
          title="Select your Birthdate"
          mode="date"
          open={open}
          onConfirm={date => {
            setOpen(false);
            setDate(date);
            console.log(date);
            Alert.alert('selected Date', `${date}`);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </>
  );
}
function Inlined({mode}: {mode: 'datetime' | 'date' | 'time'}) {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <>
      <View
        style={[
          styles.container,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        <Text style={styles.subtitle}>Inlined Component</Text>
        <DatePicker mode={mode} date={date} onDateChange={setDate} />
      </View>
    </>
  );
}
const ReactNDatePicker = ({navigation}: any) => {
  return (
    <>
      <ScrollView>
        <Divider bold />
        <Modal />
        <Inlined mode="date" />
        <Inlined mode="datetime" />
        <Inlined mode="time" />
        <Button
          title="Reset"
          onPress={() => navigation.navigate(NavigationPath.HomeDrawer)}
        />
      </ScrollView>
    </>
  );
};

export default ReactNDatePicker;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
