import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../router/router';
import { backOfficeReducer } from './backOfficeReducer';
import { SELECT_RESTAURANT } from './types';

const initialState = {
  createRestaurant: false,
  createCourse: false,
  createDish: false,
  viewMenu: false,
  viewDishes: false,
  deleteRestaurantModal: false,
  viewOrderModal: false,
  selectedTab: {
    name: 'Restaurants',
    restId: '',
  },
  selectedRestaurant: '',
  selectedCourse: {
    name: '',
    id: '',
  },
  selectedDish: {
    name: '',
    price: '',
    description: '',
    id: '',
  },
  selectedOrder: '',
  deletableRestaurant: '',
  deletableCourse: '',
  deletableDish: '',
};

const backOfficeContext = createContext();

export const BackOfficeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(backOfficeReducer, initialState);
  const { id } = useParams();

  const [image, setImage] = useState('');

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
    image,
    setImage,
  };

  return <backOfficeContext.Provider value={value}>{children}</backOfficeContext.Provider>;
};

export const useBackOfficeContext = () => useContext(backOfficeContext);
