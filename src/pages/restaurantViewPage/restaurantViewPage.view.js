/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { Link, Route, Switch, useRouteMatch, useParams } from 'react-router-dom';
import styles from './restaurantViewPage.module.css';
// import NavBar from '../../components/navBar';
import Modal from '../../components/modal';
import RestaurantUpdateForm from '../../components/restaurantUpdateForm';
import { BACKEND } from '../../router/router';

export const RestaurantViewPage = () => {
  // const { path, url } = useRouteMatch();
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
      .then((restaurant) => {
        console.log(restaurant);
        setSelectedResto(restaurant);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, [id]);
  return (
    <div>
      {selectedResto && (
        <div className={styles._restoInfo}>
          <p>{selectedResto.name}</p>
          <p>{selectedResto.RestaurantCategory.name}</p>
          <p>{selectedResto.restaurantDescription}</p>
          <button onClick={() => setIsOpenModal(true)}>Edit</button>
        </div>
      )}
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)}>
          <p>Restaurant update</p>
          <RestaurantUpdateForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
      <div className={styles._restoCourse}>
        {selectedResto &&
          selectedResto.courseList.map((course) => {
            return <p>{course.name}</p>;
          })}
        <Link to={`/menuEditPage/${id}`}>
          <button>Edit Menu</button>
        </Link>
      </div>
    </div>
  );
};
