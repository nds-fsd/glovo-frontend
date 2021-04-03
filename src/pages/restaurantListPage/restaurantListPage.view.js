import React from 'react';
import styles from './restaurantListPage.module.css';
import NavBar from '../../components/navBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import { testCategoryList } from '../../TestCategoryList';

export const RestaurantListPage = () => {
  return (
    <div className={styles.pageContainer}>
      <NavBar>{testCategoryList}</NavBar>
      <Button>Create</Button>
      <RestaurantList />
    </div>
  );
};
