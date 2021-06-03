import React from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantItem.module.css';
import restExample from '../../assets/images/restExample.jpg';
import Rating from '../rating';

export const RestaurantItem = ({ restaurant }) => {
  return (
    <div className={styles.flip_card}>
      <div className={styles.flip_card_inner}>
        <div className={styles.flip_card_front}>
          <Link to={`/restaurantViewPage/${restaurant._id}`}>
            <img
              src={restaurant.image || restExample}
              alt="a Restaurant"
              className={styles.restaurantImage}
            />
          </Link>
          <div className={styles.name}>
            <p>{restaurant.name}</p>
          </div>
        </div>
        <Link to={`/restaurantViewPage/${restaurant._id}`}>
          <div className={styles.flip_card_back}>
            <h1 style={{ fontWeight: '400' }}>{restaurant.name}</h1>
            <Rating rating={restaurant.rating} />
            <p>{restaurant.description}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};
