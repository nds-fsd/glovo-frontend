import React from 'react';
import { useBackOfficeContext } from './backOfficeContext/backOfficeContext';
import SideBar from '../../components/backOfficeComponents/sideBar';
import styles from './backOfficePage.module.css';
import RestaurantTab from '../../components/backOfficeComponents/restaurantTab';
import DeleteRestaurantModal from '../../components/backOfficeComponents/backOfficeModal/deleteRestaurantModal';
import { CANCEL_DELETE, STOP_CREATE_COURSE, STOP_CREATE_DISH } from './backOfficeContext/types';
import CreateCourseModal from '../../components/backOfficeComponents/backOfficeModal/createCourseModal';
import DishModal from '../../components/backOfficeComponents/backOfficeModal/dishModal';
import { OrdersTab } from '../../components/backOfficeComponents/ordersTab/ordersTab.view';

export const BackOfficePage = () => {
  const {
    dispatch,
    state: { deleteRestaurantModal, selectedTab, createCourse, createDish },
  } = useBackOfficeContext();

  return (
    <div className={styles.container}>
      <div className={styles.dashboard}>
        <div className={styles.tab}>
          <SideBar />
        </div>
        <div className={styles.content}>
          {selectedTab.name === 'Restaurants' && <RestaurantTab />}
          {selectedTab.name === 'Orders' && <OrdersTab />}
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
      <DishModal dishModal open={createDish} onClose={() => dispatch({ type: STOP_CREATE_DISH })} />
    </div>
  );
};
