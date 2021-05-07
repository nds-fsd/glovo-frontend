import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { backOfficeContext } from '../../components/context/backOfficeContext';
import SideBar from '../../components/backOfficeComponents/sideBar';
import styles from './backOfficePage.module.css';
import RestaurantTab from '../../components/backOfficeComponents/restaurantTab';
import { BACKOFFICE } from '../../router/router';

export const BackOfficePage = () => {
  const { selectedTab } = useContext(backOfficeContext);
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.tab}>
          <SideBar />
        </div>
        <div className={styles.content}>
          <div className={styles.title}>
            <h1 className={styles.selectedTab} onClick={() => history.push(BACKOFFICE)}>
              {selectedTab}
            </h1>
          </div>
          {selectedTab === 'Restaurant' && <RestaurantTab />}
        </div>
      </div>
    </div>
  );
};
