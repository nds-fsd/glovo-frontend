/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './dishList.module.css';
import DishItem from '../dishItem';
import { RESTAURANT } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';
import Modal from '../modal';

// This component makes a double .map(), first to get the category name and render the container,
// for each category, the second is to render all the dishes in that category.

export const DishList = ({ openModal, onDishClick }) => {
  const [restaurant, setRestaurant] = useState();

  const { id } = useParams();

  useEffect(() => {
    shortFetch({ url: `${RESTAURANT}/${id}`, method: 'GET', onSuccess: setRestaurant });
  }, [id]);
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
                    <DishItem selectedDish={dish} onClick={openModal} onDishClick={onDishClick} />
                  );
                })}
              </div>
            </>
          );
        })}
    </div>
  );
};
