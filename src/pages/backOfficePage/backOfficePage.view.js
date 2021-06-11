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
import { CategoriesTab } from '../../components/backOfficeComponents/categoriesTab/categoriesTab.view';

export const BackOfficePage = () => {
  const {
    dispatch,
    state: { deleteRestaurantModal, selectedTab, createCourse, createDish, viewOrderModal },
    userState: { editModal, deleteModal },
    userDispatch,
    categoryState: { editModal: categoryEdit, deleteModal: categoryDelete },
    categoryDispatch,
  } = useBackOfficeContext();

  return (
    <div className={styles.container} data-cy="backOffice">
      <div className={styles.dashboard}>
        <div className={styles.tab}>
          <SideBar />
        </div>
        <div className={styles.content}>
          {selectedTab.name === 'Restaurants' && <RestaurantTab />}
          {selectedTab.name === 'Orders' && <OrdersTab />}
          {selectedTab.name === 'Users' && <UsersTab />}
          {selectedTab.name === 'Categories' && <CategoriesTab />}
        </div>
      </div>
      <DeleteRestaurantModal
        open={deleteRestaurantModal || deleteModal || categoryDelete}
        onClose={() => {
          if (deleteRestaurantModal) {
            dispatch({ type: CANCEL_DELETE });
            return;
          }
          if (deleteModal) {
            userDispatch({ type: CANCEL_DELETE });
            return;
          }
          categoryDispatch({ type: CANCEL_DELETE });
        }}
      />
      <CreateCourseModal
        open={createCourse || categoryEdit}
        onClose={() => {
          if (createCourse) {
            dispatch({ type: STOP_CREATE_COURSE });
            return;
          }
          categoryDispatch({ type: CANCEL_EDIT });
        }}
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
