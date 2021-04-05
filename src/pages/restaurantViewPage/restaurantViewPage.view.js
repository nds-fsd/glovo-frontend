/* eslint-disable no-console */
import React, { useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
// import styles from './restaurantViewPage.module.css';
// import NavBar from '../../components/navBar';
import DishList from '../../components/dishList';
import Modal from '../../components/modal';
import RestaurantForm from '../../components/restaurantForm';
import RestaurantItem from '../../components/restaurantItem';

export const RestaurantViewPage = () => {
  const { path, url } = useRouteMatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <RestaurantItem />
      <button onClick={() => setIsOpenModal(true)}>Edit</button>
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <p>Restaurant update</p>
          <RestaurantForm />
        </Modal>
      )}
      <button>
        <Link to={`${path}/menuEdit`}>Menu Edit</Link>
      </button>
      <Switch>
        <Route path={`${url}/menuEdit`}>
          <DishList />
        </Route>
      </Switch>
    </div>
  );
};
