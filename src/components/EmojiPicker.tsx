/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {List1, List2, List3, List4} from '../DATA/Emoji';
import React, {memo} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface FuncProps {
  toggleModal: () => void;
}
const EmojiPicker = memo(({toggleModal}: FuncProps) => {
  const styles = StyleSheet.create({
    modalContent: {
      height: '35%',
      width: '100%',
      backgroundColor: '#3a3e42',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: 45,
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    scrollContainer: {
      flexGrow: 1,
    },
    menuItem: {
      marginLeft: 20,
      // height: 50,
      paddingVertical: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#ccc',
    },
    menuText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#000',
    },
  });
  const renderItem = ({item}: {item: string}) => (
    <TouchableOpacity style={styles.menuItem}>
      <Text style={styles.menuText}>{item}</Text>
    </TouchableOpacity>
  );
  return (
    <View style={styles.modalContent}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Choose Option</Text>
        <Pressable onPress={toggleModal}>
          <MaterialIcons name="close" color="#fff" size={24} />
        </Pressable>
      </View>
      <View style={{flex: 1}}>
        {[List1, List2, List3, List4].map((item, index) => {
          return (
            <FlatList
              data={item}
              renderItem={renderItem}
              key={index}
              showsHorizontalScrollIndicator={false}
              horizontal
              keyExtractor={(_, index) => index.toString()}
            />
          );
        })}
      </View>
    </View>
  );
});

export default EmojiPicker;
