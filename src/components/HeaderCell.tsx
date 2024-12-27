import React, {memo} from 'react';
/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface FuncProps {
  toggleModal: () => void;
  title: string;
  iconLibrary: string;
  iconName: string;
  iconWithText?: string;
}
const HeaderCell = memo(
  ({toggleModal, title, iconLibrary, iconName, iconWithText}: FuncProps) => {
    const IconLibraryMap: Record<string, any> = {
      Fontisto,
      MaterialIcons,
      Ionicons,
      FontAwesome,
    };
    const IconComponent = IconLibraryMap[iconLibrary];
    return (
      <View style={styles.header}>
        <Text style={styles.headertext}>{title}</Text>
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 4,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: -3,
            flexDirection: 'row',
          }}>
          {iconWithText && (
            <Text style={styles.iconwithText}>{iconWithText}</Text>
          )}
          {IconComponent ? (
            <IconComponent name={iconName} size={20} color="#fff" />
          ) : (
            <Text style={{color: 'red'}}>Invalid Icon</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  },
);

export default HeaderCell;
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#121B22',
    height: 45,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headertext: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  iconwithText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 17,
  },
});
