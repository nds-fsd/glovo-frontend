import React from 'react';
import styles from './dishForm.module.css';

export const DishForm = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <input type="text" placeholder="Dish Name" />
      </div>
      <div className={`${styles.subContainer} ${styles.category}`}>
        <input type="text" placeholder="Course" />
      </div>
      <div className={`${styles.subContainer} ${styles.description}`}>
        <input type="text" placeholder="Dish description" />
      </div>
      <div className={`${styles.subContainer} ${styles.price}`}>
        <input type="number" placeholder="price" />
      </div>
      <div className={`${styles.subContainer} ${styles.buttons}`}>
        <button>cancel</button>
        <button>create</button>
      </div>
    </div>
  );
};
