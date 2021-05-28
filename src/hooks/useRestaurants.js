/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';
import { getUserSession } from '../assets/utils/localStorage.utils';
import { RESTAURANT } from '../router/router';

export const useRestaurants = () => {
  const [hasRestaurants, setHasRestaurants] = useState(false);
  const [userRestaurants, setUserRestaurants] = useState();
  const [totalPages, setTotalPages] = useState();
  const [filteredRestaurants, setFilteredRestaurants] = useState();
  const [filteredPages, setFilteredPages] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userId = getUserSession().id;

  const getRestaurants = ({ page = 0, limit = 10 }) => {
    setIsLoading(true);
    const body = { user: userId };
    shortFetch({
      url: `${RESTAURANT}/search?page=${page}&limit=${limit}`,
      method: 'POST',
      body,
      token: true,
      onSuccess: (payload) => {
        setIsLoading(false);
        if (payload.count === 0) {
          setHasRestaurants(false);
          return;
        }
        setUserRestaurants(payload);
        setHasRestaurants(true);
        setTotalPages(Math.ceil(payload.count / limit));
      },
    });
  };

  const filterRestaurants = (pag, lim, search) => {
    setIsLoading(true);
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
        setIsLoading(false);

        if (payload.count === 0) {
          setFilteredPages(1);
          setFilteredRestaurants(payload);
          setHasRestaurants(true);
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

  const createRestaurant = ({
    categories,
    data,
    description,
    onSuccess,
    image,
    coordinates,
    fullAddress,
  }) => {
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
          image,
          coordinates,
          fullAddress,
        },
        token: true,
        onSuccess: () => {
          setHasRestaurants(true);
          onSuccess();
        },
      });
    }
  };
  const updateRestaurant = ({
    data,
    categories,
    id,
    description,
    onSuccess,
    image,
    coordinates,
    fullAddress,
  }) => {
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
          image,
          coordinates,
          fullAddress,
        },
        token: true,
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  const deleteRestaurant = (restId, onSuccess, onError) => {
    shortFetch({
      url: `${RESTAURANT}/${restId}`,
      token: true,
      method: 'DELETE',
      onSuccess,
      onError,
    });
  };

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
    getRestaurants,
    isLoading,
  };
};
