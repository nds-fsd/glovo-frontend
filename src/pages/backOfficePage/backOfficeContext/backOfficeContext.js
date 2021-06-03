import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../router/router';
import { backOfficeReducer } from './backOfficeReducer';
import { userReducer } from './userReducer';
import { SELECT_RESTAURANT } from './types';
import { categoryReducer } from './categoryReducer';

const initialState = {
  isNightMode: '',
  createRestaurant: false,
  createCourse: false,
  createDish: false,
  viewMenu: false,
  viewDishes: false,
  deleteRestaurantModal: false,
  viewOrderModal: false,
  changeRoleModal: false,
  selectedUser: {
    id: '',
    name: '',
    email: '',
    role: '',
  },
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

const userInitialState = {
  editModal: false,
  deleteModal: false,
  user: {
    firstName: '',
    lastName: '',
    id: '',
    role: '',
  },
};
const categoryInitialState = {
  editModal: false,
  deleteModal: false,
  category: {
    name: '',
    id: '',
  },
};

const backOfficeContext = createContext();

export const BackOfficeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(backOfficeReducer, initialState);
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [categoryState, categoryDispatch] = useReducer(categoryReducer, categoryInitialState);
  const [dishImg, setDishImg] = useState('');
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
    userState,
    userDispatch,
    categoryState,
    categoryDispatch,
    image,
    setImage,
    dishImg,
    setDishImg,
  };

  return <backOfficeContext.Provider value={value}>{children}</backOfficeContext.Provider>;
};

export const useBackOfficeContext = () => useContext(backOfficeContext);
