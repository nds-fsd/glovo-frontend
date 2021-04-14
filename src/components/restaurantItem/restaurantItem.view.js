import React from 'react';
import styles from './restaurantItem.module.css';

export const RestaurantItem = ({ children }) => {
  return <div className={styles.restoItem}>{children}</div>;
};
