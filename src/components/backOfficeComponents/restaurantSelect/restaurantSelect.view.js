import React, { useEffect } from 'react';
import styles from './restaurantSelect.module.css';
import { useRestaurants } from '../../../hooks/useRestaurants';

export const RestaurantSelect = ({ onChange }) => {
  const { userRestaurants, getRestaurants } = useRestaurants();

  useEffect(() => {
    getRestaurants({ page: 0, limit: 100 });
  }, []);

  return (
    <div className={`${styles.subContainer} ${styles.category}`}>
      <select className={styles.select} onChange={onChange}>
        <option value="" selected disabled hidden>
          Select a Restaurant
        </option>
        {userRestaurants?.list.map((restaurant) => (
          <option key={restaurant._id} value={restaurant._id} name={restaurant.name}>
            {restaurant.name}
          </option>
        ))}
      </select>
    </div>
  );
};
