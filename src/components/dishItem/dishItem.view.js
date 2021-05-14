/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCartContext } from '../../context/cartContext';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import styles from './dishItem.module.css';
import dishImg from '../../assets/images/restExample.jpg';

export const DishItem = ({ selectedDish, addToCart, openModal }) => {
  const [quantityDishes, setQuantityDishes] = useState(1);
  const { viewDishInModal } = useCartContext();

  return (
    <div className={styles._itemContainer}>
      <div
        className={styles._imgContainer}
        onClick={() => {
          openModal();
          viewDishInModal({
            dish: selectedDish.name,
            price: selectedDish.price,
            id: selectedDish._id,
          });
        }}
      >
        <img src={dishImg} alt="dish" className={styles._imgDishItem}></img>
      </div>
      <div
        className={styles._itemBody}
        onClick={() => {
          openModal();
          viewDishInModal({
            dish: selectedDish.name,
            price: selectedDish.price,
            id: selectedDish._id,
          });
        }}
      >
        <h3>{capitalize(selectedDish.name)}</h3>
        <p>{selectedDish.description}</p>
      </div>
      <div className={styles._itemFooter}>
        <p
          onClick={() => {
            openModal();
            viewDishInModal({
              dish: selectedDish.name,
              price: selectedDish.price,
              id: selectedDish._id,
            });
          }}
        >
          {formatNumber(selectedDish.price)}
        </p>
        <FontAwesomeIcon
          icon="cart-plus"
          className={styles._iconAdd}
          onClick={() => {
            setQuantityDishes((prev) => prev + 1);
            addToCart({
              quantity: quantityDishes,
              dish: selectedDish.name,
              price: selectedDish.price,
              id: selectedDish._id,
            });
          }}
        />
      </div>
    </div>
  );
};
