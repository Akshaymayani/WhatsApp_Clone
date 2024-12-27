/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  SectionList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {ContactListStyles} from '../../Styles/ContactListStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const generateContacts = (): Array<{
  id: string;
  name: string;
  contactNo: string;
  alphabet: string;
}> => {
  const contacts: Array<{
    id: string;
    name: string;
    contactNo: string;
    alphabet: string;
  }> = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  for (let i = 0; i < 100; i++) {
    const letter = alphabet[Math.floor(Math.random() * alphabet.length)];
    contacts.push({
      id: i.toString(),
      name: `${letter}${Math.floor(Math.random() * 1000)}`,
      contactNo: `+1234567890${i}`,
      alphabet: letter,
    });
  }
  return contacts;
};

const groupContactsByAlphabet = (
  contacts: Array<{
    id: string;
    name: string;
    contactNo: string;
    alphabet: string;
  }>,
) => {
  const groupedContacts: Array<{
    title: string;
    data: Array<{
      id: string;
      name: string;
      contactNo: string;
      alphabet: string;
    }>;
  }> = [];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  alphabet.forEach(letter => {
    const filteredContacts = contacts.filter(
      contact => contact.alphabet === letter,
    );
    if (filteredContacts.length > 0) {
      groupedContacts.push({
        title: letter,
        data: filteredContacts,
      });
    }
  });
  return groupedContacts;
};

type ContactItem = {
  id: string;
  name: string;
  contactNo: string;
  alphabet: string;
};

type SectionData = {
  title: string;
  data: ContactItem[];
};

const ContactList = () => {
  const [contacts] = useState<ContactItem[]>(generateContacts());
  const [groupedContacts, setGroupedContacts] = useState<Array<SectionData>>(
    groupContactsByAlphabet(contacts),
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  // const [activeLetter, setActiveLetter] = useState<string>('');
  const styles = ContactListStyles();
  // Filtering contacts based on search input
  useEffect(() => {
    const filtered = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setGroupedContacts(groupContactsByAlphabet(filtered));
  }, [searchQuery, contacts]);

  const sectionListRef = useRef<SectionList | null>(null);

  // Render Item
  const renderItem = useCallback(
    ({item}: {item: ContactItem}) => (
      <TouchableOpacity style={styles.contactItem} activeOpacity={0.7}>
        <View style={styles.contactAvatar}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.contactDetails}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactNo}>{item.contactNo}</Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Contacts..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons name="close" color="#000" size={26} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.listContainer}>
        <SectionList
          ref={sectionListRef}
          sections={groupedContacts}
          keyExtractor={item => item.id}
          keyboardDismissMode="on-drag"
          renderItem={renderItem}
          renderSectionHeader={({section}) => (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
            </View>
          )}
          initialNumToRender={50}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
        />
      </View>
    </View>
  );
};
export default ContactList;
