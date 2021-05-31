import React, { useEffect } from 'react';
import styles from './restaurantSelect.module.css';
import { getUserSession } from '../../../assets/utils/localStorage.utils';
import { usePage } from '../../../hooks/usePage';

export const RestaurantSelect = ({ onChange }) => {
  const { elements: restaurants, getElements } = usePage('restaurant');

  useEffect(() => {
    getElements({
      page: 0,
      limit: 100,
      body: {
        user: getUserSession().id,
      },
    });
  }, []);

  return (
    <div className={`${styles.subContainer} ${styles.category}`}>
      <select className={styles.select} onChange={onChange}>
        <option value="" selected disabled hidden>
          Select a Restaurant
        </option>
        {restaurants?.list.map((restaurant) => (
          <option key={restaurant._id} value={restaurant._id} name={restaurant.name}>
            {restaurant.name}
          </option>
        ))}
      </select>
    </div>
  );
};
