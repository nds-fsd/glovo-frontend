import React from 'react';
import { DISHEXAMPLES } from '../../assets/hardcoded/dishexamples';
import styles from './dishList.module.css';
import DishItem from '../dishItem';

// This component makes a double .map(), first to get the category name and render the container,
// for each category, the second is to render all the dishes in that category.

export const DishList = () => {
  return (
    <div className={styles.container}>
      {DISHEXAMPLES.map((category) => {
        const name = Object.keys(category);
        return (
          <>
            <p>{name}</p>
            <div className={styles.category_container}>
              {category[name].map((dish) => {
                return (
                  <DishItem
                    name={dish.dishName}
                    description={dish.dishDescription}
                    price={dish.price}
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
