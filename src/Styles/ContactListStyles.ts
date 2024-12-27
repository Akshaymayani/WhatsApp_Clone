import {StyleSheet} from 'react-native';

export const ContactListStyles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#fff',
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      width: '100%',
    },
    header: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    searchInput: {
      height: 40,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      paddingLeft: 15,
      fontSize: 16,
      flex: 1,
    },
    listContainer: {
      flex: 1,
      marginTop: 10,
    },
    contactItem: {
      flexDirection: 'row',
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: '#f1f1f1',
    },
    contactAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#eee',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#555',
    },
    contactDetails: {
      marginLeft: 15,
      justifyContent: 'center',
    },
    contactName: {
      fontSize: 18,
      fontWeight: '500',
    },
    contactNo: {
      fontSize: 14,
      color: '#777',
    },
    sectionHeader: {
      paddingVertical: 10,
      paddingLeft: 20,
      backgroundColor: '#dbdbdb',
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
    },
  });
};
