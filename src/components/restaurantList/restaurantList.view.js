/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import styles from './restaurantList.module.css';
import RestaurantItem from '../restaurantItem';
import { restoList } from '../../assets/hardcoded/restoTest';

export const RestaurantList = () => {
  return (
    <div className={styles.container}>
      {restoList.map((restaurant, index) => {
        return <RestaurantItem key={index}>{restaurant.name}</RestaurantItem>;
      })}
    </div>
  );
};
