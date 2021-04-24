// we could do multiple categories by plaing it in an array
import React, { createContext, useState } from 'react';

export const RestoListContext = createContext();

export const RestoListContextProvider = ({ children }) => {
  const [categorySelected, setCategorySelected] = useState('');
  const [categoryArr, setCategoryArr] = useState([]);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const clearCategories = () => {
    setCategorySelected(undefined);
  };
  const [toggleSelectedCategory, setToggleSelectedCategory] = useState(false);

  const value = {
    categorySelected,
    setCategorySelected,
    clearCategories,
    categoryArr,
    setCategoryArr,
    toggleSelectedCategory,
    setToggleSelectedCategory,
    openLoginModal,
    setOpenLoginModal,
    openSignupModal,
    setOpenSignupModal,
  };

  return <RestoListContext.Provider value={value}>{children}</RestoListContext.Provider>;
};
