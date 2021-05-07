// we could do multiple categories by plaing it in an array
import React, { createContext, useState } from 'react';

export const RestoListContext = createContext();

export const RestoListContextProvider = ({ children }) => {
  const [categoryArr, setCategoryArr] = useState([]);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const value = {
    categoryArr,
    setCategoryArr,
    openLoginModal,
    setOpenLoginModal,
    openSignupModal,
    setOpenSignupModal,
    isSearching,
    setIsSearching,
  };

  return <RestoListContext.Provider value={value}>{children}</RestoListContext.Provider>;
};
