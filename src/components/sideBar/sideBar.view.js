import React from 'react';
import { ReactComponent as Logo } from '../../assets/images/Logo.svg';
import { ReactComponent as Library } from '../../assets/icons/Library.svg';
import { ReactComponent as Cutlery } from '../../assets/icons/cutlery.svg';
import { ReactComponent as User } from '../../assets/icons/User.svg';
import { ReactComponent as Shutdown } from '../../assets/icons/Shutdown.svg';
import styles from './sideBar.module.css';

export const SideBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo className={styles.icon} />
      </div>
      <div className={styles.myRestaurant}>
        <h4>MY RESTAURANT</h4>
        <div className={styles.tab}>
          <Library className={styles.icon} /> Restaurant
        </div>
        <div className={styles.tab}>
          <Cutlery className={styles.icon} /> Courses
        </div>
      </div>
      <div className={styles.user}>
        <h4>MY ACCOUNT</h4>
        <div className={styles.tab}>
          <User className={styles.icon} /> User
        </div>
        <div className={styles.tab}>
          <Shutdown className={styles.icon} /> Log Out
        </div>
      </div>
    </div>
  );
};
