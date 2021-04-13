import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantListPage.module.css';
import NavBar from '../../components/navBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import { RestoListContext } from '../../components/context/restoListPageContext';
import { RESTAURANT_CREATION_PAGE, RESTAURANT_CATEGORY } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';

export const RestaurantListPage = () => {
  const { categoryArr, setCategoryArr } = useContext(RestoListContext);
  useEffect(() => {
    shortFetch({ url: RESTAURANT_CATEGORY, method: 'get', onSuccess: setCategoryArr });
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
