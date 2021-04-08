/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantList.module.css';
import RestaurantItem from '../restaurantItem';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../router/router';

export const RestaurantList = () => {
  const [allRest, setAllRest] = useState();
  useEffect(() => {
    shortFetch({ url: RESTAURANT, method: 'get', onSuccess: setAllRest });
  }, []);
  return (
    <div className={styles.container}>
      {allRest &&
        allRest.map((resto) => {
          return (
            <Link to={`/restaurantViewPage/${resto._id}`}>
              <RestaurantItem key={resto._id}>{resto.name}</RestaurantItem>
            </Link>
          );
        })}
    </div>
  );
};
