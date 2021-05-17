import React, { createContext, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { shortFetch } from '../../assets/utils/fetch.utils';
// import { getUserSession } from '../../assets/utils/localStorage.utils';
// import { BACKOFFICE, RESTAURANT } from '../../router/router';

export const backOfficeContext = createContext();

export const BackOfficeContextProvider = ({ children }) => {
  const [createRestaurant, setCreateRestaurant] = useState(false);
  const [selectedTab, setSelectedTab] = useState('Restaurants');
  const [deleteRestaurantModal, setDeleteRestaurantModal] = useState(false);
  const [deletableRestaurant, setDeletableRestaurant] = useState();
  const [image, setImage] = useState('');

  const changeTab = (newTab) => {
    setSelectedTab(newTab);
  };

  const value = {
    createRestaurant,
    setCreateRestaurant,
    selectedTab,
    changeTab,
    deleteRestaurantModal,
    setDeleteRestaurantModal,
    deletableRestaurant,
    setDeletableRestaurant,
    image,
    setImage,
  };

  return <backOfficeContext.Provider value={value}>{children}</backOfficeContext.Provider>;
};
