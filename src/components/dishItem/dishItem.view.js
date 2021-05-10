/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import styles from './dishItem.module.css';
import dishImg from '../../assets/images/restExample.jpg';

export const DishItem = ({
  onClick,
  onDishClick,
  selectedDish,
  deleteDish,
  isDishList,
  addToCart,
  openModal,
  viewDishInModal,
}) => {
  const [quantityDishes, setQuantityDishes] = useState(1);

  return (
    <div className={styles._itemContainer}>
      <div
        className={styles._imgContainer}
        onClick={() => {
          openModal();
          viewDishInModal({
            quantity: quantityDishes,
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
            quantity: quantityDishes,
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
              quantity: quantityDishes,
              dish: selectedDish.name,
              price: selectedDish.price,
              id: selectedDish._id,
            });
          }}
        >
          {formatNumber(selectedDish.price)}
        </p>
        <FontAwesomeIcon
          icon="plus-circle"
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
