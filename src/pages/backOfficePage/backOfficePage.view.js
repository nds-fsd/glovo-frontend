import React, { useContext } from 'react';
import { backOfficeContext } from '../../components/context/backOfficeContext';
import SideBar from '../../components/backOfficeComponents/sideBar';
import styles from './backOfficePage.module.css';
import RestaurantTab from '../../components/backOfficeComponents/restaurantTab';

export const BackOfficePage = () => {
  const { selectedTab } = useContext(backOfficeContext);
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.tab}>
          <SideBar />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h1 className={styles.selectedTab}>{selectedTab}</h1>
          </div>
          {selectedTab === 'Restaurant' && <RestaurantTab />}
        </div>
      </div>
    </div>
  );
};
