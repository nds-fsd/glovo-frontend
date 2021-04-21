/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './dishList.module.css';
import DishItem from '../dishItem';
import { RESTAURANT, BACKEND, DISH } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';

// This component makes a double .map(), first to get the category name and render the container,
// for each category, the second is to render all the dishes in that category.

export const DishList = ({ openModal, onDishClick, toggle }) => {
  const [restaurant, setRestaurant] = useState();
  const { id } = useParams();

  useEffect(() => {
    shortFetch({ url: `${RESTAURANT}/${id}`, method: 'GET', onSuccess: setRestaurant });
  }, [id, toggle]);

  const deleteDish = (dishId) => {
    const options = {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(`${BACKEND}/dish/${dishId}`, options)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .catch((err) => {
        return console.log(err);
      });
  };

  useEffect(() => {
    shortFetch({ url: `${RESTAURANT}/${id}`, method: 'GET', onSuccess: setRestaurant });
  }, [deleteDish]);

  return (
    <div className={styles.container}>
      {restaurant &&
        restaurant.courseList.map((cat) => {
          return (
            <>
              <p style={{ color: '#E0E0E0', paddingLeft: '10px', fontSize: '20px' }}>{cat.name}</p>
              <div className={styles.category_container}>
                {cat.dishList.map((dish) => {
                  return (
                    <DishItem
                      selectedDish={dish}
                      onClick={openModal}
                      onDishClick={onDishClick}
                      deleteDish={deleteDish}
                    />
                  );
                })}
              </div>
            </>
          );
        })}
    </div>
  );
};
