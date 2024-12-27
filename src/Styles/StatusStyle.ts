import {StyleSheet} from 'react-native';

export const StatusStyle = () =>
  StyleSheet.create({
    MainContainer: {
      flex: 1,
      position: 'relative',
    },
    container: {
      flex: 1,
    },
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
    moreOptionContainer: {
      padding: 4,
      borderRadius: 12,
      position: 'absolute',
      bottom: 8,
      right: 8,
      zIndex: 10,
      width: 55,
      height: 110,
      justifyContent: 'space-around',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
      gap: 10,
    },
    iconButton: {
      flex: 1,
      width: '100%',
      backgroundColor: '#babdbf',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraButton: {
      backgroundColor: '#54D365',
    },
    //status_carousel
    statusContainer: {
      flexDirection: 'column',
      marginHorizontal: 7,
      width: 80,
    },
    statusImageContainer: {
      width: '100%',
      height: 80,
      flexDirection: 'column',
    },
    statusImageIconView: {
      position: 'absolute',
      top: 50,
      left: 60,
      width: 25,
      height: 25,
      display: 'flex',
      borderRadius: 20,
      alignContent: 'center',
      justifyContent: 'center',
    },
    statusImageIcon: {
      borderRadius: 20,
      backgroundColor: '#babdbf',
      color: '#28343c',
      fontWeight: 'bold',
    },
    statusName: {
      width: '100%',
      height: 40,
    },
    statusNameText: {
      textAlign: 'center',
      fontSize: 15,
    },
    // follow card of influencer and celebrities
    cardContainer: {
      marginBottom: 100,
      marginTop: 30,
    },
    card: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      marginVertical: 15,
      width: 140,
      marginTop: 10,
      backgroundColor: 'rgba(0,0,0,0.1)',
      borderRadius: 10,
      paddingHorizontal: 5,
      paddingVertical: 8,
    },
    cardImage: {
      width: 80,
      height: 80,
      flexDirection: 'column',
      shadowColor: 'grey',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 5,
      shadowRadius: 5,
      elevation: 5,
    },
    cardImageIcon: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      color: '#4dc360',
      fontSize: 28,
    },
    cardTextContainer: {
      marginTop: 10,
    },
    cardName: {
      textAlign: 'center',
      fontSize: 15,
      fontWeight: '500',
    },
    cardButtonWrapper: {
      width: '90%',
      marginTop: 10,
    },
    cardButton: {
      backgroundColor: '#baedc1',
      borderRadius: 20,
    },
    cardButtonText: {
      textAlign: 'center',
      fontSize: 15,
      color: '#3e5953',
      paddingVertical: 8,
    },
  });
