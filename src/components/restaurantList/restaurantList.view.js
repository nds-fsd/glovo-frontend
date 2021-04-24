/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from 'react';
import styles from './restaurantList.module.css';
import RestaurantItem from '../restaurantItem';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../router/router';
import { RestoListContext } from '../context/restoListPageContext';

export const RestaurantList = () => {
  const [allRest, setAllRest] = useState();
  const { categorySelected } = useContext(RestoListContext);
  useEffect(() => {
    if (!categorySelected) {
      shortFetch({ url: RESTAURANT, method: 'get', onSuccess: setAllRest });
    } else {
      shortFetch({
        url: '/restaurant/search/',
        method: 'post',
        body: {
          restaurantCategory: `${categorySelected}`,
        },
        onSuccess: setAllRest,
      });
    }
  }, [categorySelected]);
  return (
    <div className={styles.container}>
      {allRest &&
        allRest.map((resto) => {
          return <RestaurantItem key={resto._id} restaurant={resto} />;
        })}
    </div>
  );
};
