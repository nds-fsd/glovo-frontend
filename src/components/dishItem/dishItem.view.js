/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './dishItem.module.css';
import dishImg from '../../assets/images/restExample.jpg';

export const DishItem = ({
  onClick,
  onDishClick,
  selectedDish,
  deleteDish,
  isDishList,
  capitalLetter,
}) => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(num);
  };

  return (
    <div className={styles._itemContainer}>
      <div className={styles._imgContainer}>
        <img src={dishImg} alt="ice-cream" className={styles._imgDishItem}></img>
      </div>
      <div className={styles._itemBody}>
        <h3>{capitalLetter(selectedDish.name)}</h3>
        <p>{selectedDish.description}</p>
      </div>
      <div className={styles._itemFooter}>
        <p>{formatNumber(selectedDish.price)}</p>
        <FontAwesomeIcon icon="plus-circle" className={styles._iconAdd} />
      </div>

      {isDishList && (
        <div>
          <button onClick={() => deleteDish(selectedDish._id)}>X</button>
          <button
            onClick={() => {
              onClick();
              onDishClick({
                name: selectedDish.name,
                description: selectedDish.description,
                price: selectedDish.price,
                id: selectedDish._id,
              });
            }}
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
};
