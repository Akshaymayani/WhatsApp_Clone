import {StyleSheet, useWindowDimensions} from 'react-native';

export const PersonalChatStyles = () => {
  const {width} = useWindowDimensions();
  return StyleSheet.create({
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
      width: 120,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    lastSeen: {
      fontSize: 12,
      color: '#fff',
      marginTop: 5,
    },
    // MessageList Styles
    messageWrapper: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      minHeight: '100%',
      paddingBottom: 5,
    },
    keyboardContainer: {
      // position: 'absolute',
      // bottom: 0,
      width: '100%',
      height: 45,
      left: 0,
      flexDirection: 'row',
      marginHorizontal: 5,
      marginBottom: 2,
      // borderWidth: 3,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#28343C',
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 5,
      marginBottom: 10,
      width: '86%',
      height: '100%',
    },
    input: {
      flex: 1,
      marginRight: 10,
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 5,
    },
    iconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 10,
    },
    sendbtn: {
      width: '10.5%',
      height: '100%',
      backgroundColor: '#28343C',
      // padding: 10,
      marginLeft: 5,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
    },
    messageText: {
      backgroundColor: '#a6a6a6',
      fontSize: 15,
      fontWeight: '400',
      color: '#000',
      padding: 5,
      borderRadius: 5,
      textAlign: 'left',
    },
    messageContainer: {
      marginVertical: 3,
      width,
    },
    chatBubble: {
      maxWidth: 300,
      paddingRight: 8,
      backgroundColor: '#e6f7ff',
      borderTopRightRadius: 0,
      position: 'relative',
    },
    notch: {
      position: 'absolute',
      bottom: 0,
      right: 1,
      width: 12,
      height: 6,
      backgroundColor: '#a6a6a6',
      borderBottomRightRadius: 1,
      borderTopRightRadius: 10,
      transform: [{rotate: '0deg'}],
    },
  });
};
