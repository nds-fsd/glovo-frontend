import React from 'react';
import styles from './restaurantTab.module.css';
// import CreateRestaurantTab from './createRestaurantTab';
// import { backOfficeContext } from '../../context/backOfficeContext';
// import ViewRestaurantTab from './viewRestaurantTab';
import AllRestaurantsTab from './allRestaurantsTab';

export const RestaurantTab = () => {
  // const { hasARestaurant } = useContext(backOfficeContext);
  return (
    <div className={styles.container}>
      <AllRestaurantsTab />
      {/* {!hasARestaurant && <CreateRestaurantTab />}
      {hasARestaurant && <ViewRestaurantTab />} */}
    </div>
  );
};
