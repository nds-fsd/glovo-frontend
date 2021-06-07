import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './restaurantItem.module.css';
import restExample from '../../assets/images/restExample.jpg';
import Rating from '../rating';
import { formatNumber } from '../../assets/utils/convertToCurrency';

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
            <h1 style={{ fontWeight: '400', margin: '0, 0.7em' }}>{restaurant.name}</h1>
            <Rating rating={restaurant.rating} />
            <div className={styles.allIconsFeatures}>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon="clock" className={styles._iconsFeatures} />
                {restaurant.deliveryTime}
              </div>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon="coins" className={styles._iconsFeatures} />
                {restaurant.priceRating}
              </div>
              <div className={styles.iconContainer}>
                <FontAwesomeIcon icon="bicycle" className={styles._iconsFeatures} />
                {formatNumber(Number(restaurant.deliveryCost || 1.0))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
