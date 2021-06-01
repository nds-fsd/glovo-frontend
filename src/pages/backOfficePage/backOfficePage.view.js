import React from 'react';
import { useBackOfficeContext } from './backOfficeContext/backOfficeContext';
import SideBar from '../../components/backOfficeComponents/sideBar';
import styles from './backOfficePage.module.css';
import RestaurantTab from '../../components/backOfficeComponents/restaurantTab';
import DeleteRestaurantModal from '../../components/backOfficeComponents/backOfficeModal/deleteRestaurantModal';
import {
  CANCEL_DELETE,
  CANCEL_EDIT,
  STOP_CREATE_COURSE,
  STOP_CREATE_DISH,
  STOP_VIEW_ORDER,
} from './backOfficeContext/types';
import CreateCourseModal from '../../components/backOfficeComponents/backOfficeModal/createCourseModal';
import DishModal from '../../components/backOfficeComponents/backOfficeModal/dishModal';
import { OrdersTab } from '../../components/backOfficeComponents/ordersTab/ordersTab.view';
import { ViewOrderModal } from '../../components/backOfficeComponents/backOfficeModal/viewOrderModal/viewOrderModal.view';
import UsersTab from '../../components/backOfficeComponents/usersTab';
import EditRoleModal from '../../components/backOfficeComponents/backOfficeModal/editRoleModal';

export const BackOfficePage = () => {
  const {
    dispatch,
    state: { deleteRestaurantModal, selectedTab, createCourse, createDish, viewOrderModal },
    userState: { editModal, deleteModal },
    userDispatch,
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
          {selectedTab.name === 'Users' && <UsersTab />}
        </div>
      </div>
      <DeleteRestaurantModal
        open={deleteRestaurantModal || deleteModal}
        onClose={() => {
          if (deleteRestaurantModal) {
            dispatch({ type: CANCEL_DELETE });
            return;
          }
          userDispatch({ type: CANCEL_DELETE });
        }}
      />
      <CreateCourseModal
        open={createCourse}
        onClose={() => dispatch({ type: STOP_CREATE_COURSE })}
      />
      <DishModal bigModal open={createDish} onClose={() => dispatch({ type: STOP_CREATE_DISH })} />
      <ViewOrderModal
        bigModal
        open={viewOrderModal}
        onClose={() => dispatch({ type: STOP_VIEW_ORDER })}
      />
      <EditRoleModal open={editModal} onClose={() => userDispatch({ type: CANCEL_EDIT })} />
    </div>
  );
};
