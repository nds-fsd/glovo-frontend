import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import styles from './restaurantTab.module.css';
import CreateRestaurantTab from './createRestaurantTab';
import ViewRestaurantTab from './viewRestaurantTab';
import AllRestaurantsTab from './allRestaurantsTab';
import { useRestaurants } from '../../../hooks/useRestaurants';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import MenuTab from '../menuTab';
import DishesTab from '../dishesTab';

export const RestaurantTab = () => {
  const {
    state: { createRestaurant, viewMenu, viewDishes },
  } = useBackOfficeContext();
  const { id } = useParams();
  const { hasRestaurants, getRestaurants } = useRestaurants();

  useEffect(() => {
    getRestaurants({ page: 0, limit: 10 });
  }, []);

  return (
    <>
      {!id && hasRestaurants && !createRestaurant && <AllRestaurantsTab />}
      {(!hasRestaurants || createRestaurant) && <CreateRestaurantTab />}
      {hasRestaurants && id && !createRestaurant && !viewMenu && !viewDishes && (
        <ViewRestaurantTab />
      )}
      {hasRestaurants && id && !createRestaurant && viewMenu && <MenuTab />}
      {hasRestaurants && id && !createRestaurant && viewDishes && <DishesTab />}
    </>
  );
};
