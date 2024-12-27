import {StyleSheet, useWindowDimensions} from 'react-native';

export const SettingPageStyles = () => {
  const {width, height} = useWindowDimensions();
  const modalWidth = width - 40;
  return StyleSheet.create({
    header: {
      width,
      height: 360,
      borderBottomLeftRadius: 40,
      borderBottomRightRadius: 40,
      overflow: 'hidden',
    },
    headerImg: {
      width,
      height: '100%',
    },
    headerButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      paddingHorizontal: 15,
      top: 65,
      width,
      left: 0,
      zIndex: 45,
    },
    button: {
      // Common styles for both buttons
      backgroundColor: 'transparent',
    },
    maincontainer: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      width,
      height,
      position: 'relative',
    },
    profileImg: {
      // position: 'absolute',
      // top: 80,
      // left: width / 2 - 110 / 2,
      width: 100,
      height: 100,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: 'white',
    },
    content: {
      width,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    desc: {
      color: 'white',
      fontWeight: 'bold',
      marginTop: 10,
      fontSize: 16,
      fontFamily: 'Serif',
    },
    modal: {
      width: modalWidth,
      minHeight: 415,
      borderRadius: 20,
      backgroundColor: '#F3F4F6',
      padding: 8,
      position: 'absolute',
      top: 310,
      left: (width - modalWidth) / 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.5,
      shadowRadius: 15,
      elevation: 5,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      width: '85%',
    },
    footerwrapper: {
      backgroundColor: '#365DE9',
      width: '100%',
      padding: 13,
      borderRadius: 25,
      shadowColor: '#365DE9',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 20,
      shadowRadius: 10,
      elevation: 5,
    },
    footertext: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'Serif',
      textAlign: 'center',
    },
    modaltoptext: {
      fontSize: 14,
      color: '#365DE9',
      marginTop: 5,
    },
    modalTop: {
      justifyContent: 'space-between',
      alignItems: 'stretch',
      flexDirection: 'row',
      marginVertical: 10,
    },
    modalTopItem: {
      backgroundColor: '#E2E3E5',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#B9B9B9',
      paddingVertical: 10,
      marginHorizontal: 5,
      borderRadius: 10,
    },
    modal_mid: {
      flex: 1,
    },
    miditem: {
      flex: 1,
      //   overflow: 'scroll',
      backgroundColor: '#E2E3E5',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#B9B9B9',
      flexDirection: 'row',
      paddingHorizontal: 10,
      marginHorizontal: 5,
      height: 55,
      borderRadius: 10,
      marginTop: 5,
    },
    desc_text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#365DE9',
    },
  });
};
