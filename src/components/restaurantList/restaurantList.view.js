/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import styles from './restaurantList.module.css';
import RestaurantItem from '../restaurantItem';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../router/router';

export const RestaurantList = () => {
  const [allRest, setAllRest] = useState();
  const history = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    if (!history.location.search) {
      shortFetch({ url: RESTAURANT, method: 'get', onSuccess: setAllRest });
    } else {
      shortFetch({
        url: `/restaurantCategory/nameSearch`,
        method: 'post',
        body: {
          name: `${query.get('name')}`,
        },
        onSuccess: setAllRest,
      });
    }
  }, [history.location.search]);
  return (
    <div className={styles.container}>
      {allRest &&
        allRest.map((resto) => {
          return <RestaurantItem key={resto._id} restaurant={resto} />;
        })}
    </div>
  );
};
