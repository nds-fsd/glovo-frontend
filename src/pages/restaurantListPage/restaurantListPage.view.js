/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantListPage.module.css';
import NavBar from '../../components/navBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import { RESTAURANT_CREATION_PAGE } from '../../router/router';

export const RestaurantListPage = () => {
  const [categoryArr, setCategoryArr] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/restaurantCategory')
      .then((response) => response.json())
      .then((data) => setCategoryArr(data));
  }, []);
  return (
    <div className={styles.pageContainer}>
      <NavBar>{categoryArr}</NavBar>
      <Link to={`${RESTAURANT_CREATION_PAGE}`}>
        <Button>Create</Button>
      </Link>
      <RestaurantList />
    </div>
  );
};
