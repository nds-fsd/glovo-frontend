import React from 'react';
import SideBar from '../../components/sideBar';
import styles from './backOfficePage.module.css';

export const BackOfficePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.tab}>
          <SideBar />
        </div>
        <div className={styles.content}>CONTENT BAR</div>
      </div>
    </div>
  );
};
