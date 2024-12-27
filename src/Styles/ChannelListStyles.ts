import {StyleSheet} from 'react-native';

export const ChannelListStyles = () =>
  StyleSheet.create({
    headerScrollbar: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
    },
    categoryContainer: {
      justifyContent: 'center',
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      marginHorizontal: 6,
    },
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      backgroundColor: '#fff',
      height: 70,
      marginBottom: 4,
    },
    leftAction: {
      flex: 1,
      backgroundColor: 'green',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      gap: 12,
      alignItems: 'center',
      paddingHorizontal: 15,
      marginBottom: 4,
      borderRadius: 5,
    },
    rightAction: {
      flex: 1,
      backgroundColor: 'red',
      justifyContent: 'flex-end',
      flexDirection: 'row',
      gap: 4,
      alignItems: 'center',
      paddingHorizontal: 4,
      marginBottom: 4,
      borderRadius: 5,
    },
    actionText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 17,
    },
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      alignItems: 'center',
      width: 120,
    },
    image: {
      width: 60,
      height: 60,
      borderRadius: 60,
      marginLeft: 10,
    },
    followers: {
      fontSize: 15,
    },
    title: {
      fontWeight: '600',
      fontSize: 17,
    },
  });
