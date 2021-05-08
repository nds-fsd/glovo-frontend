import { useEffect, useState } from 'react';
import { shortFetch } from '../assets/utils/fetch.utils';
import { getUserSession } from '../assets/utils/localStorage.utils';
import { RESTAURANT } from '../router/router';

export const useRestaurants = (page = 1, limit = 10, restName) => {
  const [hasRestaurants, setHasRestaurants] = useState(false);
  const [userRestaurants, setUserRestaurants] = useState();
  const [totalPages, setTotalPages] = useState();
  const userId = getUserSession().id;

  useEffect(() => {
    const body = { user: userId };
    if (restName) {
      body.name = restName;
    }
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
  }, [page, limit, restName]);

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

  return {
    hasRestaurants,
    userRestaurants,
    totalPages,
    createRestaurant,
    updateRestaurant,
  };
};
