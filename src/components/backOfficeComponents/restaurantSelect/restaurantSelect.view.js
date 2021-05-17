import React, { useEffect } from 'react';
import styles from './restaurantSelect.module.css';

export const RestaurantSelect = () => {
  useEffect(() => {}, []);

  return (
    <div className={`${styles.subContainer} ${styles.category}`}>
      <select className={styles.select}>
        <option value="" selected disabled hidden>
          Select a Category
        </option>
        {/* {restaurantList.map((cat) => (
          <option key={cat._id} value={cat._id} name={cat.name}>
            {cat.name}
          </option>
        ))} */}
      </select>
    </div>
  );
};
