import React from 'react';
import { formatNumber } from '../../../assets/utils/convertToCurrency';
import styles from './orderItem.module.css';

export const OrderItem = ({ item }) => {
  return (
    <div className={styles.itemContainer}>
      <div className={styles.quantity}>{item.qty}</div>
      <div className={styles.dishName}>
        <p>{item.Dish.name}</p>
        <div className={styles.itemContainer}>
          <p style={{ color: 'var(--salyGrayText)', marginRight: '2px' }}>
            {formatNumber(item.Dish.price)}
          </p>
          <p>{formatNumber(item.Dish.price * item.qty)}</p>
        </div>
      </div>
    </div>
  );
};
