/* eslint-disable no-debugger */
import { useEffect, useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';
import { getUserSession } from '../assets/utils/localStorage.utils';
import { RESTAURANT } from '../router/router';

export const useRestaurants = (page = 1, limit = 10) => {
  const [hasRestaurants, setHasRestaurants] = useState(false);
  const [userRestaurants, setUserRestaurants] = useState();
  const [totalPages, setTotalPages] = useState();
  const [filteredRestaurants, setFilteredRestaurants] = useState();
  const [filteredPages, setFilteredPages] = useState();

  const userId = getUserSession().id;

  useEffect(() => {
    const body = { user: userId };
    shortFetch({
      url: `${RESTAURANT}/search?page=${page}&limit=${limit}`,
      method: 'POST',
      body,
      token: true,
      onSuccess: (payload) => {
        if (payload.count === 0) {
          setHasRestaurants(false);
          return;
        }
        setUserRestaurants(payload);
        setHasRestaurants(true);
        setTotalPages(Math.ceil(payload.count / limit));
      },
    });
  }, [page, limit]);

  const filterRestaurants = (pag, lim, search) => {
    const body = { user: userId };
    if (search) {
      body.name = search;
    }
    shortFetch({
      url: `${RESTAURANT}/search?page=${pag}&limit=${lim}`,
      method: 'POST',
      body,
      token: true,
      onSuccess: (payload) => {
        if (payload.count === 0) {
          setHasRestaurants(false);
          return;
        }
        setFilteredRestaurants(payload);
        setHasRestaurants(true);
        setFilteredPages(Math.ceil(payload.count / lim));
      },
    });
  };
  const clearFilter = () => {
    setFilteredRestaurants(undefined);
    setFilteredPages(undefined);
  };

  const createRestaurant = ({ categories, data, description, setCreateRestaurant }) => {
    if (data && categories.length > 0) {
      const categoryIds = categories.map((category) => {
        return category._id;
      });

      shortFetch({
        url: RESTAURANT,
        method: 'POST',
        body: {
          name: data.name,
          restaurantDescription: description,
          open: true,
          address: {
            number: data.number,
            street: data.street,
            zipcode: data.zipcode,
          },
          restaurantCategory: categoryIds,
          user: userId,
        },
        token: true,
        onSuccess: () => {
          setCreateRestaurant(false);
        },
      });
    }
  };
  const updateRestaurant = ({ data, categories, id, description, setCreateRestaurant }) => {
    if (data && categories.length > 0) {
      const categoryIds = categories.map((category) => {
        return category._id;
      });
      shortFetch({
        url: `${RESTAURANT}/${id}`,
        method: 'PATCH',
        body: {
          name: data.name,
          restaurantDescription: description,
          open: true,
          address: {
            number: data.number,
            street: data.street,
            zipcode: data.zipcode,
          },
          restaurantCategory: categoryIds,
          user: userId,
        },
        token: true,
        onSuccess: () => {
          setCreateRestaurant(false);
        },
      });
    }
  };

  const deleteRestaurant = (restId, onSucces, onError) => {
      shortFetch({
          url:`${RESTAURANT}/${restId}`,
          token: true,
          onSuccess,
          onError
      })
  }

  return {
    deleteRestaurant,
    hasRestaurants,
    userRestaurants,
    totalPages,
    createRestaurant,
    updateRestaurant,
    filteredRestaurants,
    filterRestaurants,
    clearFilter,
    filteredPages,
  };
};
