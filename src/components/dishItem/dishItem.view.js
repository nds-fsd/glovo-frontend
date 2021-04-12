/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './dishItem.module.css';

// This component recieves the name, description and price from EACH dish in the rendered category
// used in DishList component.

export const DishItem = ({ onClick, onDishClick, selectedDish }) => {
  return (
    <div
      className={styles._container}
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
      <p>{selectedDish.name}</p>
      <p>{selectedDish.description}</p>
      <p>{selectedDish.price}</p>
    </div>
  );
};
