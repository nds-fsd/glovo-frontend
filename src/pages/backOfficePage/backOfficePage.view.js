import React from 'react';
import { useBackOfficeContext } from './backOfficeContext/backOfficeContext';
import SideBar from '../../components/backOfficeComponents/sideBar';
import styles from './backOfficePage.module.css';
import RestaurantTab from '../../components/backOfficeComponents/restaurantTab';
import DeleteRestaurantModal from '../../components/backOfficeComponents/backOfficeModal/deleteRestaurantModal';
import { CANCEL_DELETE, STOP_CREATE_COURSE } from './backOfficeContext/types';
import CreateCourseModal from '../../components/backOfficeComponents/backOfficeModal/createCourseModal';

export const BackOfficePage = () => {
  const {
    dispatch,
    state: { deleteRestaurantModal, selectedTab, createCourse },
  } = useBackOfficeContext();

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.tab}>
          <SideBar />
        </div>
        <div className={styles.content}>
          {selectedTab.name === 'Restaurants' && <RestaurantTab />}
        </div>
      </div>
      <DeleteRestaurantModal
        open={deleteRestaurantModal}
        onClose={() => dispatch({ type: CANCEL_DELETE })}
      />
      <CreateCourseModal
        open={createCourse}
        onClose={() => dispatch({ type: STOP_CREATE_COURSE })}
      />
    </div>
  );
};
