import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
export const ChatPageStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121B22',
    },
    scrollView: {
      flexGrow: 1,
    },
    chatContainer: {
      flex: 1,
    },
    archived__main: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 9,
      borderBottomWidth: 4,
      borderBottomColor: '#b9bdc0',
      borderBottomLeftRadius: 7,
      borderBottomRightRadius: 7,
    },
    chat__main: {
      width,
      display: 'flex',
      flexDirection: 'row',
    },
    archived__icon: {
      width: '20%',
      alignItems: 'center',
    },
    archived__title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginLeft: 10,
    },
    //Chat-category styles
    chatCategoryContainer: {
      position: 'absolute',
      top: 50,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: Platform.OS === 'ios' ? '6.4%' : '6.3%',
      paddingHorizontal: 8,
      paddingVertical: 8,
      backgroundColor: '#2F3A44',
    },
    chatCategoryBtn: {
      paddingHorizontal: 12,
      paddingVertical: 5,
      borderRadius: 8,
      marginRight: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatItemContainer: {
      backgroundColor: '#121B22',
      height: 75,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      elevation: 2,
    },
    chat_main: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#121B22',
      borderBottomWidth: 3,
      borderBottomColor: '#525c62',
      paddingVertical: 4,
    },
    chat_left: {
      width: '20%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    chat_right: {
      width: '80%',
      height: '100%',
      flexDirection: 'column',
      // justifyContent: 'space-around',
      // alignItems: 'center',
      padding: 6,
    },
    chat_messsage: {
      marginTop: 8,
      flexDirection: 'row',
    },
    chat_messageText: {
      color: '#fff',
      marginLeft: 5,
    },
    image: {
      width: 55,
      height: 55,
      borderRadius: 55,
    },
    timer_image: {
      position: 'absolute',
      bottom: '-10%',
      right: '15%',
      width: '35%',
      height: '55%',
      borderRadius: 100,
      color: '#687076',
      fontSize: 30,
      zIndex: 11,
    },
    chatdate: {
      color: '#fff',
      fontSize: 13,
      marginRight: 5,
      marginTop: 5,
    },
    footer: {
      color: '#93999d',
      textAlign: 'center',
      fontSize: 14,
    },
    newmessage: {
      padding: 8,
      backgroundColor: '#3d484f',
      borderRadius: 10,
      position: 'absolute',
      bottom: 15,
      right: 15,
      zIndex: 10,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
