/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
// import styles from './restaurantViewPage.module.css';
// import NavBar from '../../components/navBar';
import DishList from '../../components/dishList';
import Modal from '../../components/modal';
import RestaurantForm from '../../components/restaurantForm';
import { BACKEND } from '../../router/router';

export const RestaurantViewPage = () => {
  const { path, url } = useRouteMatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { id } = useParams();
  const [selectedResto, setSelectedResto] = useState();

  useEffect(() => {
    fetch(`${BACKEND}/restaurant/${id}`)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((response) => {
        console.log(response);
        setSelectedResto(response);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, [id]);

  return (
    <div>
      {selectedResto && <p>{selectedResto.name}</p>}
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
