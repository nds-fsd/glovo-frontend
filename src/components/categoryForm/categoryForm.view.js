import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './categoryForm.module.css';

export const CategoryForm = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <p>{id}</p>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <input type="text" placeholder="New category" />
      </div>
    </div>
  );
};
