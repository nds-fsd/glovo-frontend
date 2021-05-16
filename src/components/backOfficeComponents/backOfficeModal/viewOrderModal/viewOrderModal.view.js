/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrders } from '../../../../hooks/useOrders';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import styles from './viewOrderModal.module.css';
import { DishForm } from '../../../forms/dishForm/dishForm.view';

export const ViewOrderModal = ({ onClose, open, bigModal }) => {
  const [order, setOrder] = useState({});
  const {
    state: { selectedOrder },
  } = useBackOfficeContext();
  const { getOneOrder } = useOrders();

  useEffect(() => {
    getOneOrder(selectedOrder, setOrder);
  }, [selectedOrder]);

  return (
    <BackOfficeModal
      bigModal={bigModal}
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <div className={styles.container}>
        <div className={styles.header}>{order && order.orderNumber}</div>
      </div>
    </BackOfficeModal>
  );
};
