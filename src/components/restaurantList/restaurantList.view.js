/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantList.module.css';
import RestaurantItem from '../restaurantItem';
import { restoList } from '../../assets/hardcoded/restoTest';

export const RestaurantList = () => {
  return (
    <div className={styles.container}>
      {restoList.map((resto) => {
        return (
          <Link to={`/restaurantViewPage/${resto._id}`}>
            <RestaurantItem key={resto._id}>{resto.name}</RestaurantItem>;
          </Link>
        );
      })}
    </div>
  );
};
