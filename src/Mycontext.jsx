// MyContext.js
import React, { createContext, useContext } from 'react';

const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const value = { basename: '/my-base' }; 
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  return useContext(MyContext);
};
