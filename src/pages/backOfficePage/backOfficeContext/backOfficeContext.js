import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../router/router';
import { backOfficeReducer } from './backOfficeReducer';
import { SELECT_RESTAURANT } from './types';

const initialState = {
  createRestaurant: false,
  createCourse: false,
  selectedTab: {
    name: 'Restaurants',
    restId: '',
  },
  viewMenu: false,
  deleteRestaurantModal: false,
  deletableRestaurant: '',
  selectedRestaurant: '',
};

const backOfficeContext = createContext();

export const BackOfficeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(backOfficeReducer, initialState);
  const { id } = useParams();

  useEffect(() => {
    if (!state.selectedRestaurant && id) {
      shortFetch({
        url: `${RESTAURANT}/${id}`,
        method: 'GET',
        token: true,
        onSuccess: (payload) => {
          dispatch({ type: SELECT_RESTAURANT, payload: payload.name });
        },
      });
    }
  }, [id]);

  const value = {
    state,
    dispatch,
  };

  return <backOfficeContext.Provider value={value}>{children}</backOfficeContext.Provider>;
};

export const useBackOfficeContext = () => useContext(backOfficeContext);
