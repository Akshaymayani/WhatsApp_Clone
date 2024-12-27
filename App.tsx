import React, {useEffect} from 'react';

import LoginProvider from './src/Context/LoginProvider';
import MainNavigation from './src/Routes';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import store from './src/Redux/Store';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <LoginProvider>
            <MainNavigation />
          </LoginProvider>
        </PaperProvider>
      </Provider>
    </>
  );
};

export default App;
// const styles = StyleSheet.create({
//   drawerContent: {
//     flex: 1,
//   },
//   drawerHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     backgroundColor: '#99bbf2',
//     borderRadius: 10,
//     margin: 10,
//     height: 70,
//   },
//   drawerHeaderText: {
//     fontSize: 20,
//     color: 'blue',
//   },
//   drawerItem: {
//     marginVertical: 5,
//   },
//   drawerImage: {
//     height: 75,
//     width: 75,
//     borderRadius: 75,
//   },
//   drawerItemText: {
//     fontSize: 14,
//   },
//   icon: {
//     fontSize: 50,
//     color: 'blue',
//   },
// });
