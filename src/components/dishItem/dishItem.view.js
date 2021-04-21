/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND, DISH } from '../../router/router';
import styles from './dishItem.module.css';

// This component recieves the name, description and price from EACH dish in the rendered category
// used in DishList component.

export const DishItem = ({ onClick, onDishClick, selectedDish, deleteDish }) => {
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
      <button onClick={() => deleteDish(selectedDish._id)}>X</button>
    </div>
  );
};
