import {NavigationPath, RootStackParamList} from '../../types/Navigation';
import React, {useCallback} from 'react';
/* eslint-disable react-hooks/exhaustive-deps */
import {SectionList, Text, View} from 'react-native';

import {Channel} from '../../DATA/Channel';
import {MasterChannelListStyles} from '../../Styles/MasterChannelListStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp} from '@react-navigation/native';
import {RectButton} from 'react-native-gesture-handler';
import RenderChannelList from '../../components/RenderChannelList';

interface Channel {
  id: number;
  title: string;
  verified: boolean;
  added: boolean;
  followers: number;
  category: string;
}
interface SectionProps {
  title: string;
  data: Channel[];
}

type MasterChannelNavigationProp = NavigationProp<
  RootStackParamList,
  NavigationPath.MasterChannel
>;
interface Props {
  navigation: MasterChannelNavigationProp;
}
const groupByCategory = (channels: any) => {
  return channels.reduce((acc: any, channel: any) => {
    if (!acc[channel.category]) {
      acc[channel.category] = [];
    }
    if (acc[channel.category].length < 5) {
      acc[channel.category].push(channel);
    }
    return acc;
  }, {});
};

const groupedChannels = groupByCategory(Channel);
const sections: SectionProps[] = Object.keys(groupedChannels).map(category => ({
  title: category,
  data: groupedChannels[category],
}));

const MasterChannelList = ({navigation}: Props) => {
  const styles = MasterChannelListStyles();
  const renderSectionHeader = ({section}: {section: SectionProps}) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{section.title}</Text>
      <RectButton
        style={styles.headerBtn}
        onPress={() => {
          console.log(`Viewing all channels in ${section.title}`);
          navigation.navigate(NavigationPath.Channel, {
            category: section.title,
          });
        }}>
        <Text style={styles.headerBtnText}>See All</Text>
        <MaterialIcons name="arrow-forward-ios" color="#fff" size={17} />
      </RectButton>
    </View>
  );

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.footerContainer}>
        <RectButton
          style={styles.footerBtn}
          onPress={() => navigation.navigate(NavigationPath.Channel, {})}>
          <Text style={styles.footerBtnText}>Explore More</Text>
        </RectButton>
      </View>
    );
  }, [navigation]);

  return (
    <SectionList
      sections={sections}
      renderSectionHeader={renderSectionHeader}
      renderItem={({item}) => <RenderChannelList item={item} />}
      keyExtractor={item => item.id.toString()}
      ListFooterComponent={renderFooter}
    />
  );
};
export default MasterChannelList;
