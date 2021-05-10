// we could do multiple categories by plaing it in an array
import React, { createContext, useState } from 'react';

export const RestoListContext = createContext();

export const RestoListContextProvider = ({ children }) => {
  const [categoryArr, setCategoryArr] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const value = {
    categoryArr,
    setCategoryArr,
    isSearching,
    setIsSearching,
  };

  return <RestoListContext.Provider value={value}>{children}</RestoListContext.Provider>;
};
