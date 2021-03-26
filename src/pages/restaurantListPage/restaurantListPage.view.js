import React from 'react';
import styles from './restaurantListPage.module.css';
import Navbar from '../../components/navbar';

export const RestaurantListPage = () => {
  return (
    <div className={styles.pageContainer}>
      <Navbar></Navbar>
    </div>
  );
};
