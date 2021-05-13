import React from 'react';
import { useParams } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import styles from './restaurantTab.module.css';
import CreateRestaurantTab from './createRestaurantTab';
import ViewRestaurantTab from './viewRestaurantTab';
import AllRestaurantsTab from './allRestaurantsTab';
import { useRestaurants } from '../../../hooks/useRestaurants';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import MenuTab from '../menuTab';

export const RestaurantTab = () => {
  const {
    state: { createRestaurant, viewMenu },
  } = useBackOfficeContext();
  const { id } = useParams();
  const { hasRestaurants } = useRestaurants();

  return (
    <>
      {!id && hasRestaurants && !createRestaurant && <AllRestaurantsTab />}
      {(!hasRestaurants || createRestaurant) && <CreateRestaurantTab />}
      {hasRestaurants && id && !createRestaurant && !viewMenu && <ViewRestaurantTab />}
      {hasRestaurants && id && !createRestaurant && viewMenu && <MenuTab />}
    </>
  );
};
