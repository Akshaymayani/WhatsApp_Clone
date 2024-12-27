import React, {useContext} from 'react';

import LoginProvider from '../Context/LoginProvider';

export const AuthHook = () => {
  const context = useContext(LoginProvider);
  if (!context) {
    throw new Error(
      err => err + 'use MyContext must be used within a MyProvider',
    );
  }
  return context;
};
