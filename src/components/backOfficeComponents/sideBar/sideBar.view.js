import React, { useContext } from 'react';
import { ReactComponent as Logo } from '../../../assets/images/Logo.svg';
import { ReactComponent as Library } from '../../../assets/icons/Library.svg';
import { ReactComponent as Cutlery } from '../../../assets/icons/cutlery.svg';
import { ReactComponent as User } from '../../../assets/icons/User.svg';
import { ReactComponent as Shutdown } from '../../../assets/icons/Shutdown.svg';
import styles from './sideBar.module.css';
import { backOfficeContext } from '../../context/backOfficeContext';

export const SideBar = () => {
  const { changeTab } = useContext(backOfficeContext);
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Logo className={styles.icon} />
      </div>

      <h4 className={styles.title}>MY RESTAURANT</h4>
      <div className={styles.tab} onClick={() => changeTab('Restaurant')}>
        <Library className={styles.icon} /> Restaurant
      </div>
      <div className={styles.tab} onClick={() => changeTab('Courses')}>
        <Cutlery className={styles.icon} /> Courses
      </div>

      <h4 className={styles.title}>MY ACCOUNT</h4>
      <div className={styles.tab} onClick={() => changeTab('User')}>
        <User className={styles.icon} /> User
      </div>
      <div className={styles.tab}>
        <Shutdown className={styles.icon} /> Log Out
      </div>
    </div>
  );
};
