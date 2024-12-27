/* eslint-disable eqeqeq */
import React, {useEffect} from 'react';

import {StorageKey} from '../types/StorageKeyTypes';
import {storage} from '../mmkv/MmkvStorage';

export const LoginContext = React.createContext();

const LoginProvider = ({children}) => {
  const [user, setUser] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userdata = storage.getString(StorageKey.USER);
        if (userdata != null || userdata != undefined) {
          setUser(JSON.parse(userdata));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  function handleUserData(userData) {
    if (userData) {
      setUser(userData);
      storage.set(StorageKey.USER, JSON.stringify(userData));
    } else {
      setUser(null);
      storage.delete(StorageKey.USER);
    }
  }
  return (
    <LoginContext.Provider value={{user, handleUserData}}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
