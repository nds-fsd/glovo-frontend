import React, { useState } from 'react';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
// import styles from './restaurantViewPage.module.css';
// import NavBar from '../../components/navBar';
import DishList from '../../components/dishList';
import Modal from '../../components/modal';
import RestaurantForm from '../../components/restaurantForm';

export const RestaurantViewPage = () => {
<<<<<<< HEAD
  const { path, url } = useRouteMatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div>
      <p>Restaurant Name</p>
      <p>Category</p>
      <p>Restaurant Description</p>
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
=======
  return (
    <div className={styles.container}>
      <NavBar />
      <DishList />
>>>>>>> Development
    </div>
  );
};
