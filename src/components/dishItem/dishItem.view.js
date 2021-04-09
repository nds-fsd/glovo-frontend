import React from 'react';
import styles from './dishItem.module.css';

// This component recieves the name, description and price from EACH dish in the rendered category
// used in DishList component.

export const DishItem = ({ name, description, price, onClick }) => {
  return (
    <div className={styles._container} onClick={onClick}>
      <p>{name}</p>
      <p>{description}</p>
      <p>{price}</p>
    </div>
  );
};
