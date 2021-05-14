/* eslint-disable no-debugger */
import { useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';
import { COURSE } from '../router/router';

export const useDishes = () => {
  const [dishes, setDishes] = useState({ count: 0, list: [] });
  const [hasDishes, setHasDishes] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPages, setFilteredPages] = useState();
  const [filteredDishes, setFilteredDishes] = useState();

  const getDishes = ({ id, page, limit = 5 }) => {
    shortFetch({
      url: `${COURSE}/search?page=${page}&limit=${limit}`,
      method: 'POST',
      body: {
        Restaurant: id,
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
  const filterDishes = ({ id, pag, lim, search }) => {
    const body = { Restaurant: id };
    if (search) {
      body.name = search;
    }
    shortFetch({
      url: `${COURSE}/search?page=${pag}&limit=${lim}`,
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

  const deleteDishes = ({ courseId, onSuccess }) => {
    shortFetch({
      url: `${COURSE}/deleteAll/${courseId}`,
      token: true,
      method: 'DELETE',
      onSuccess,
    });
  };

  const createDishes = ({ restaurantId, courseName, onSuccess }) => {
    const body = {
      Restaurant: restaurantId,
      name: courseName,
    };
    shortFetch({ url: `${COURSE}`, method: 'POST', token: true, body, onSuccess });
  };

  const editCourse = ({ courseName, courseId, onSuccess }) => {
    shortFetch({
      url: `${COURSE}/${courseId}`,
      method: 'PUT',
      token: true,
      body: { name: courseName },
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
    editCourse,
  };
};
