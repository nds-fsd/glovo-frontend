import React, { createContext, useContext, useReducer } from 'react';
import { backOfficeReducer } from './backOfficeReducer';

const initialState = {
  createRestaurant: false,
  selectedTab: {
    name: 'Restaurants',
    restId: '',
  },
  viewMenu: false,
  deleteRestaurantModal: false,
  deletableRestaurant: '',
  selectedRestaurant: 'Restaurants',
};

const backOfficeContext = createContext();

export const BackOfficeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(backOfficeReducer, initialState);

  const value = {
    state,
    dispatch,
  };

  return <backOfficeContext.Provider value={value}>{children}</backOfficeContext.Provider>;
};

export const useBackOfficeContext = () => useContext(backOfficeContext);
