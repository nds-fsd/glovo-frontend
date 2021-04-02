import React from 'react';
import styles from './restaurantViewPage.module.css';
import NavBar from '../../components/navBar';
import DishList from '../../components/dishList';

export const RestaurantViewPage = () => {
  return (
    <div className={styles.container}>
      <NavBar />
      <DishList />
    </div>
  );
};
