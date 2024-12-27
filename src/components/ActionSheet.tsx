/* eslint-disable react-native/no-inline-styles */
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface Props {
  handleVisible: () => void;
  handleClearChat: () => void;
}
const ActionSheet = memo(({handleClearChat, handleVisible}: Props) => {
  return (
    <View style={styles.modalContent}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Actions</Text>
        <Pressable onPress={handleVisible}>
          <MaterialIcons name="close" color="#fff" size={25} />
        </Pressable>
      </View>
      <View style={styles.modalBody}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.actionButton}
          onPress={handleClearChat}>
          <Text style={styles.btnText}>Clear Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.actionButton}
          onPress={handleVisible}>
          <Text style={[styles.btnText, {color: 'red'}]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});
export default ActionSheet;

const styles = StyleSheet.create({
  modalContent: {
    height: '20%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '23%',
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
    fontSize: 18,
  },
  modalBody: {
    flex: 1,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  actionButton: {
    padding: 8,
    width: '50%',
    backgroundColor: '#687076',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
