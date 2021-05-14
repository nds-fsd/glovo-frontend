/* eslint-disable no-debugger */
import { useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';
import { DISH } from '../router/router';

export const useDishes = () => {
  const [dishes, setDishes] = useState({ count: 0, list: [] });
  const [hasDishes, setHasDishes] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPages, setFilteredPages] = useState();
  const [filteredDishes, setFilteredDishes] = useState();

  const getDishes = ({ courseId, page, limit = 5 }) => {
    shortFetch({
      url: `${DISH}/search?page=${page}&limit=${limit}`,
      method: 'POST',
      body: {
        Course: courseId,
      },
      token: true,
      onSuccess: (payload) => {
        if (payload.count === 0) {
          setHasDishes(false);
          return;
        }
        setDishes(payload);
        setHasDishes(true);
        setTotalPages(Math.ceil(payload.count / limit));
      },
    });
  };
  const filterDishes = ({ courseId, pag, lim, search }) => {
    const body = { Course: courseId };
    if (search) {
      body.name = search;
    }
    shortFetch({
      url: `${DISH}/search?page=${pag}&limit=${lim}`,
      method: 'POST',
      body,
      token: true,
      onSuccess: (payload) => {
        if (payload.count === 0) {
          setFilteredPages(1);
          setFilteredDishes(payload);
          setHasDishes(true);
          return;
        }

        setFilteredDishes(payload);
        setHasDishes(true);
        setFilteredPages(Math.ceil(payload.count / (lim || 1)));
      },
    });
  };
  const clearFilter = () => {
    setFilteredDishes(undefined);
    setFilteredPages(undefined);
  };

  const deleteDishes = ({ dishId, onSuccess }) => {
    shortFetch({
      url: `${DISH}/${dishId}`,
      token: true,
      method: 'DELETE',
      onSuccess,
    });
  };

  const createDishes = ({ courseId, data, description, onSuccess }) => {
    const body = {
      Course: courseId,
      name: data.name,
      price: data.price,
      description,
    };
    shortFetch({ url: `${DISH}`, method: 'POST', token: true, body, onSuccess });
  };

  const editDish = ({ dishId, data, description, onSuccess }) => {
    const body = {
      name: data.name,
      price: data.price,
      description,
    };
    shortFetch({
      url: `${DISH}/${dishId}`,
      method: 'PATCH',
      token: true,
      body,
      onSuccess,
    });
  };

  return {
    hasDishes,
    totalPages,
    dishes,
    getDishes,
    filterDishes,
    clearFilter,
    filteredDishes,
    filteredPages,
    deleteDishes,
    createDishes,
    editDish,
  };
};
