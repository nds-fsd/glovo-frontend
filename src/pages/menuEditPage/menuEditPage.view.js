import React from 'react';
import styles from './menuEditPage.module.css';
import DishList from '../../components/dishList';

export const MenuEditPage = () => {
  return (
    <div className={styles.container}>
      <DishList />
    </div>
  );
};
