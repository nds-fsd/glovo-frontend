/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import styles from './restaurantList.module.css';
import RestaurantItem from '../restaurantItem';
import { restoList } from '../../assets/hardcoded/restoTest';
import { RestaurantViewPage } from '../../pages/restaurantViewPage/restaurantViewPage.view';

export const RestaurantList = () => {
  return (
    <div>
      <div className={styles.container}>
        {restoList.map((resto) => {
          return (
            <Link to={`/restaurantViewPage/${resto._id}`}>
              <RestaurantItem key={resto._id}>{resto.name}</RestaurantItem>;
            </Link>
          );
        })}
      </div>
      <Switch>
        <Route path="/restaurantViewPage/:id" component={RestaurantViewPage} />
      </Switch>
    </div>
  );
};
