import React from 'react';
import classNames from 'classnames';
import styles from './orderRow.module.css';

import { formatNumber } from '../../../assets/utils/convertToCurrency';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { VIEW_ORDER } from '../../../pages/backOfficePage/backOfficeContext/types';

export const OrderRow = ({ order }) => {
  const { dispatch } = useBackOfficeContext();
  return (
    <div
      className={classNames([styles.row], { [styles.completed]: order.status })}
      onClick={() => {
        dispatch({ type: VIEW_ORDER, payload: order._id });
      }}
    >
      {order && (
        <>
          <div
            className={classNames([styles.column], { [styles.completed]: order.status })}
            style={{ width: '50%', color: 'black' }}
            onClick={() => {}}
          >
            {order.orderNumber}
          </div>
          <div className={styles.column} style={{ width: '25%' }}>
            {order.status ? 'Completed' : 'Pending'}
          </div>
          <div className={styles.column} style={{ width: '25%' }}>
            {formatNumber(order.total)}
          </div>
          <div className={styles.column} style={{ width: '25%' }}>
            {order.createdAt.slice(0, 10)}
          </div>
        </>
      )}
    </div>
  );
};
