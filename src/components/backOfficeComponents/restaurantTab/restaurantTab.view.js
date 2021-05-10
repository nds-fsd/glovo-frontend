import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './restaurantTab.module.css';
import CreateRestaurantTab from './createRestaurantTab';
import ViewRestaurantTab from './viewRestaurantTab';
import AllRestaurantsTab from './allRestaurantsTab';
import { useRestaurants } from '../../../hooks/useRestaurants';
import { backOfficeContext } from '../../context/backOfficeContext';

export const RestaurantTab = () => {
  const { createRestaurant } = useContext(backOfficeContext);
  const { id } = useParams();
  const { hasRestaurants } = useRestaurants();
  return (
    <div
      className={classNames(styles.container, {
        [styles.biggerTab]: !id && hasRestaurants && !createRestaurant,
      })}
    >
      {!id && hasRestaurants && !createRestaurant && <AllRestaurantsTab />}
      {(!hasRestaurants || createRestaurant) && <CreateRestaurantTab />}
      {hasRestaurants && id && !createRestaurant && <ViewRestaurantTab />}
    </div>
  );
};
