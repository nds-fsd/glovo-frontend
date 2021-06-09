import React from 'react';
import logo from '../../assets/images/globoBalloon.png';
import styles from './loading.module.css';

export const Loading = () => {
  return (
    <div className={styles.logoContainer}>
      <img className={styles.logo} src={logo} alt="logo" />
      <h3>Loading</h3>
    </div>
  );
};
