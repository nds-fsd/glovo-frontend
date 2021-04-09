// we could do multiple categories by plaing it in an array
import React, { createContext, useState } from 'react';

export const RestoListContext = createContext();

export const RestoListContextProvider = ({ children }) => {
  const [categorySelected, setCategorySelected] = useState('');
  const [categoryArr, setCategoryArr] = useState([]);
  const clearCategories = () => {
    setCategorySelected(undefined);
  };

  const value = {
    categorySelected,
    setCategorySelected,
    clearCategories,
    categoryArr,
    setCategoryArr,
  };

  return <RestoListContext.Provider value={value}>{children}</RestoListContext.Provider>;
};
