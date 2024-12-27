import {StyleSheet} from 'react-native';

export const CallPageStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#f1f1f1',
      alignItems: 'center',
    },
    tabBar: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#e0e0e0',
      paddingVertical: 4,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1,
    },
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      backgroundColor: '#e0e0e0',
      padding: 10,
    },
    tabText: {
      fontSize: 16,
      color: '#333',
    },
    selectedTabText: {
      color: '#28343C',
      fontWeight: 'bold',
    },
    indicator: {
      position: 'absolute',
      height: 3,
      backgroundColor: '#28343C',
      bottom: 0,
      borderRadius: 1.5,
    },
    list: {
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
    callItem: {
      width: '100%',
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 2,
      borderBottomColor: '#ddd',
      padding: 8,
      backgroundColor: '#fff',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 50,
      padding: 5,
      borderWidth: 1.5,
      borderColor: '#3d484f',
    },
    callDetails: {
      flex: 1,
      marginLeft: 15,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    callTime: {
      fontSize: 14,
      color: '#888',
    },
    callType: {
      fontSize: 14,
      color: '#007AFF',
    },
  });
