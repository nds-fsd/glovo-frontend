import React from 'react';
import { useHistory } from 'react-router-dom';
import { useBackOfficeContext } from './backOfficeContext/backOfficeContext';
import SideBar from '../../components/backOfficeComponents/sideBar';
import styles from './backOfficePage.module.css';
import RestaurantTab from '../../components/backOfficeComponents/restaurantTab';
import { BACKOFFICE } from '../../router/router';
import MenuTab from '../../components/backOfficeComponents/menuTab';
import DeleteRestaurantModal from '../../components/backOfficeComponents/backOfficeModal/deleteRestaurantModal';
import { CANCEL_DELETE } from './backOfficeContext/types';

export const BackOfficePage = () => {
  const {
    dispatch,
    state: { deleteRestaurantModal, selectedTab },
  } = useBackOfficeContext();
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
          {selectedTab === 'Restaurants' && <RestaurantTab />}
          {selectedTab !== 'Restaurants' && selectedTab !== 'Users' && <MenuTab />}
        </div>
      </div>
      <DeleteRestaurantModal
        open={deleteRestaurantModal}
        onClose={() => dispatch({ type: CANCEL_DELETE })}
      />
    </div>
  );
};
