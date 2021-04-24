/* eslint-disable no-console */
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantListPage.module.css';
import CategoryBar from '../../components/categoryBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import { RestoListContext } from '../../components/context/restoListPageContext';
import { RESTAURANT_CREATION_PAGE, RESTAURANT_CATEGORY } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { Header } from './header.view';
import NavbarG from '../../components/navbarG';

export const RestaurantListPage = () => {
  const { categoryArr, setCategoryArr } = useContext(RestoListContext);
  useEffect(() => {
    shortFetch({ url: RESTAURANT_CATEGORY, method: 'get', onSuccess: setCategoryArr });
  }, []);

  return (
    <div className={styles.pageContainer}>
      <Header>
        <NavbarG />
      </Header>
      <div className={styles.restaurantContainer}>
        <h1 className={styles.title}>WHAT&apos;s ON THE MENU?</h1>
        <p className={styles.title}>Choose a Category</p>
        <CategoryBar>{categoryArr}</CategoryBar>
        <Link to={`${RESTAURANT_CREATION_PAGE}`}>
          <Button buttonText="Create" />
        </Link>
        <RestaurantList />
      </div>
    </div>
  );
};
