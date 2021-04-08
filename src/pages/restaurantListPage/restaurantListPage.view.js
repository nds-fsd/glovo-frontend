/* eslint-disable no-console */
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantListPage.module.css';
import NavBar from '../../components/navBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import { RESTAURANT_CREATION_PAGE } from '../../router/router';
import { RestoDataContext } from '../../context/restaurantContext';

export const RestaurantListPage = () => {
  const { allRestoData, setAllRestoData } = useContext(RestoDataContext);

  useEffect(() => {
    fetch('http://localhost:3001/restaurantCategory')
      .then((response) => response.json())
      .then((data) => setAllRestoData(data));
  }, []);
  return (
    <div className={styles.pageContainer}>
      {console.log(allRestoData)}
      <NavBar>{allRestoData}</NavBar>
      <Link to={`${RESTAURANT_CREATION_PAGE}`}>
        <Button>Create</Button>
      </Link>
      <RestaurantList />
    </div>
  );
};
