import {Platform, StyleSheet} from 'react-native';

export const MasterChannelListStyles = () => {
  return StyleSheet.create({
    headerContainer: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
    headerBtn: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      backgroundColor: '#59626a',
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerBtnText: {
      fontWeight: '500',
      fontSize: 16,
      color: '#fff',
    },
    footerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerBtn: {
      marginVertical: 10,
      marginBottom: Platform.OS === 'ios' ? 30 : 10,
      marginLeft: 4,
      paddingVertical: 8,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#59626a',
      width: '30%',
    },
    footerBtnText: {
      color: '#fff',
      fontSize: 16,
    },
  });
};
