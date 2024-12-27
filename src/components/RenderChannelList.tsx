/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import React, {memo} from 'react';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  item: {
    id: number;
    title: string;
    verified: boolean;
    added: boolean;
    followers: number;
    category: string;
  };
}
const RenderChannelList = memo(({item}: Props) => {
  const colorSchema = useColorScheme();
  const styles = StyleSheet.create({
    itemContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'stretch',
      backgroundColor: '#fff',
      height: 70,
      marginBottom: 4,
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
      marginRight: 3,
    },
    firstSection: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
    },
    secondSection: {
      justifyContent: 'center',
      marginRight: 20,
    },
  });
  return (
    <View style={styles.itemContainer}>
      <View style={styles.firstSection}>
        <View>
          <Image
            source={{uri: 'https://via.placeholder.com/100'}}
            style={styles.image}
          />
        </View>
        <View>
          <View
            style={{
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={[
                styles.title,
                {color: colorSchema === 'dark' ? '#fff' : '#000'},
              ]}>
              {item.title}
            </Text>
            {item.verified && (
              <MaterialIcon
                name="verified"
                style={{color: '#4dc360', fontSize: 22}}
              />
            )}
          </View>
          <View>
            <Text
              style={[
                styles.followers,
                {color: colorSchema === 'dark' ? '#fff' : '#000'},
              ]}>
              {item.followers} Followers
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.secondSection}>
        {item.added ? (
          <TouchableOpacity>
            <FontAwesome6 name="check" size={20} color="green" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <Fontisto name="plus-a" size={20} color="green" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

export default RenderChannelList;
