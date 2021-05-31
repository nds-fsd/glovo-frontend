/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useOrders } from '../../../../hooks/useOrders';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import styles from './viewOrderModal.module.css';
import { DishForm } from '../../../forms/dishForm/dishForm.view';
import { formatNumber } from '../../../../assets/utils/convertToCurrency';
import OrderItem from '../../orderItem';
import Button from '../../../button';
import Loading from '../../../loading';

export const ViewOrderModal = ({ onClose, open, bigModal }) => {
  const [order, setOrder] = useState({});
  const list = order.orderList;
  const {
    state: { selectedOrder },
  } = useBackOfficeContext();
  const { getOneOrder, toggleOrder, isLoading } = useOrders();

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
        <div className={styles.header}>
          <h1>{order && order.orderNumber}</h1>
          <FontAwesomeIcon
            icon="times-circle"
            style={{ color: 'var(--darkSalyBlue)', fontSize: '33px' }}
            onClick={() => onClose()}
          />
        </div>
        <h3 className={styles.subtitle}>Order Details</h3>
        <div className={styles.tableHeader}>
          <div className={styles.qty}>QTY</div>
          <div className={styles.dishName}>Dish Name</div>
          <div className={styles.totals}>
            <p>Unit</p>
            <p>Total</p>
          </div>
        </div>
        <div className={styles.orderDetails}>
          {isLoading && <Loading />}
          {list?.map((item) => (
            <OrderItem key={item._id} item={item} />
          ))}
        </div>
        <p className={styles.total}>{`Total ${formatNumber(order.total)}`}</p>
        <span style={{ alignSelf: 'flex-end' }}>
          <Button
            buttonStyle="primary"
            onClick={() => toggleOrder({ orderId: order._id, onSuccess: () => onClose() })}
          >
            {!order.status ? 'Complete' : 'Re open'}
          </Button>
        </span>
      </div>
    </BackOfficeModal>
  );
};
