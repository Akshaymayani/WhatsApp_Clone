import {Platform, StatusBar, StyleSheet} from 'react-native';

const iosHeight = 110;
const androidHeight = 100;
export const SubscribedChannelStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#f0f0f0',
    },
    header: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: Platform.OS === 'android' ? androidHeight : iosHeight,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 45,
      backgroundColor: '#141D26',
      zIndex: 1,
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.6,
      shadowRadius: 12,
      elevation: 5,
    },
    headerContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      flex: 1,
    },
    headerTitle: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    scrollIndicator: {
      position: 'absolute',
      bottom: 20,
      left: 0,
      right: 0,
      zIndex: 10,
    },
    scrollContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollText: {
      color: '#000',
      fontWeight: '700',
      fontSize: 15,
    },
    card: {
      margin: 10,
      backgroundColor: 'white',
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 3,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    image: {
      width: '100%',
      height: 200,
    },
    channelDesc: {
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: '100%',
      padding: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    title: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    headerContainer: {
      alignItems: 'center',
    },
    headerText: {
      color: '#000',
      fontSize: 20,
      fontWeight: '600',
    },
  });
