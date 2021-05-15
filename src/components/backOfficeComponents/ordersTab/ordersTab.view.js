import React, { useState } from 'react';
import RestaurantSelect from '../restaurantSelect';
import styles from './ordersTab.module.css';

export const OrdersTab = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  console.debug(selectedRestaurant);
  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.selectedRestaurant}>Orders</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.restaurantSelectContainer}>
          <RestaurantSelect restaurantSelected={(value) => setSelectedRestaurant(value)} />
        </div>
      </div>
    </>
  );
};
