/* eslint-disable consistent-return */

import { useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import classNames from 'classnames';
import styles from './restaurantList.module.css';
import RestaurantItem from '../restaurantItem';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT, RESTAURANT_LIST_PAGE, RESTAURANT_CATEGORY } from '../../router/router';

export const RestaurantList = () => {
  const [allRest, setAllRest] = useState();
  const history = useHistory();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  useEffect(() => {
    if (history.location.pathname.includes('category')) {
      return shortFetch({
        url: `${RESTAURANT_CATEGORY}/nameSearch`,
        method: 'post',
        body: {
          name: `${query.get('name')}`,
        },
        onSuccess: setAllRest,
      });
    }
    if (history.location.pathname.includes('search')) {
      if (query.get('search').length > 0) {
        return shortFetch({
          url: `${RESTAURANT}/researchA`,
          method: 'post',
          body: {
            search: query.get('search'),
          },
          onSuccess: setAllRest,
        });
      }
      history.push(RESTAURANT_LIST_PAGE);
    } else {
      shortFetch({ url: RESTAURANT, method: 'get', onSuccess: setAllRest });
    }
  }, [history.location.search]);

  return (
    <>
      <div className={styles.fader}></div>
      <div
        className={classNames([styles.container], {
          [styles.onSearch]: history.location.search.includes('name'),
        })}
      >
        {allRest &&
          allRest.map((resto) => {
            return <RestaurantItem key={resto._id} restaurant={resto} />;
          })}
      </div>
      <div className={styles.reverseFader}></div>
    </>
  );
};
