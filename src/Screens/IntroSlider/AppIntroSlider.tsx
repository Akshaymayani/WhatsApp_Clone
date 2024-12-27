/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationPath, RootStackParamList} from '../../types/Navigation';

import AnimatedView from '../../components/AnimatedView';
import AppIntroSlider from 'react-native-app-intro-slider';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {StorageKey} from '../../types/StorageKeyTypes';
import {storage} from '../../mmkv/MmkvStorage';
import {useColorScheme} from 'react-native';

const {width} = Dimensions.get('window');
const slides = [
  {
    key: 1,
    title: 'Thanks For Downloading App',
    text: `In this application, I've leveraged the power of Navigation and Animated libraries to ensure native-like performance. These tools have enabled us to create a seamless user experience that feels right at home on mobile devices.`,
    image: require('../../assets/Profile.jpeg'),
    backgroundColor: '#9bd0cc',
  },
  {
    key: 2,
    title: 'Explore Whatsapp Clone Created By Akshay Mayani',
    text: 'One of the Main Part of this application is WhatsApp Clone, I hope you are like this one and give me Feedback on this but this is only the layout part i am working on WhatsApp clone to make more interacitve with user',
    image: require('../../assets/Whatsapp_Clone.png'),
    backgroundColor: '#82b28d',
  },
  {
    key: 3,
    title: 'Getting Started !',
    text: '\nApp version : 1.0.1',
    image: require('../../assets/IntroPage.jpg'),
    backgroundColor: '#c1c2ee',
  },
];
type Props = {
  navigation: StackNavigationProp<
    RootStackParamList,
    NavigationPath.AppIntroSlider
  >;
};

const IntroSlider = ({navigation}: Props) => {
  const colorSchema = useColorScheme();
  function buttonWrapper(label: string) {
    return (
      <View style={styles.btnContainer}>
        <Text style={styles.btnText}>{label}</Text>
      </View>
    );
  }

  const handleDone = () => {
    storage.set(StorageKey.VISIBLEINTRO, false);
    navigation.replace(NavigationPath.HomeDrawer, {
      screen: NavigationPath.WhatsApp,
    });
  };
  return (
    <React.Fragment>
      <StatusBar
        barStyle={colorSchema === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent={true}
      />
      <AppIntroSlider
        data={slides}
        renderItem={({item}) => {
          return (
            <View
              style={[
                styles.sliderContainer,
                {backgroundColor: `${item.backgroundColor}`},
              ]}>
              <View style={styles.sliderBox}>
                <AnimatedView duration={200} animationType="zoom" delay={10}>
                  <Image
                    source={item.image}
                    alt="Image of Slider"
                    style={styles.slideImage}
                    // resizeMode="stretch"
                  />
                </AnimatedView>
                <AnimatedView duration={200} animationType="fade" delay={200}>
                  <Text style={styles.slideText}>{item.title}</Text>
                </AnimatedView>
                <AnimatedView duration={200} animationType="fade" delay={400}>
                  <Text style={styles.sliderDesc}>{item.text}</Text>
                </AnimatedView>
              </View>
            </View>
          );
        }}
        activeDotStyle={{backgroundColor: '#351c75', width: 20}}
        showSkipButton
        renderNextButton={() => buttonWrapper('Next')}
        renderSkipButton={() => buttonWrapper('Skip')}
        renderDoneButton={() => buttonWrapper('Done')}
        onDone={handleDone}
      />
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    paddingTop: 150,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  sliderBox: {
    width: '90%',
    maxWidth: width * 0.8,
    maxHeight: width * 0.8,
    aspectRatio: 1,
    borderRadius: 15,
  },
  slideText: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 20,
    fontWeight: '500',
    fontFamily: 'arial',
    color: '#000',
  },
  sliderDesc: {
    textAlign: 'center',
    fontSize: 16,
    padding: 15,
  },
  slideImage: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    resizeMode: 'cover',
  },
  btnContainer: {
    padding: 13,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
export default IntroSlider;
