/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import EditToolTip from '../toolTip';
import styles from './dishRow.module.css';

import { BACKOFFICE } from '../../../router/router';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { VIEW_RESTAURANT } from '../../../pages/backOfficePage/backOfficeContext/types';
import { formatNumber } from '../../../assets/utils/convertToCurrency';

export const DishRow = ({ dish }) => {
  const { dispatch } = useBackOfficeContext();
  const [popUp, setPopUp] = useState(false);
  const [openToolTip, setOpenToolTip] = useState(false);
  const history = useHistory();

  return (
    <div className={styles.row}>
      {dish && (
        <>
          <div
            className={`${styles.column} ${styles.name}`}
            style={{ width: '32%', color: 'var(--salyBlack)' }}
            onClick={() => {}}
          >
            {dish.name}
          </div>
          <div
            className={styles.column}
            onMouseEnter={() => setPopUp(true)}
            onMouseLeave={() => setPopUp(false)}
            style={{ width: '15%' }}
          >
            <p style={{ color: 'var(--salyBlue)' }}> {formatNumber(dish.price)} </p>
          </div>
          <div className={styles.description}>{dish.description}</div>
          <div className={styles.column} style={{ width: '20%' }}>
            Created At
          </div>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon
              icon="ellipsis-v"
              className={styles.icon}
              onClick={() => setOpenToolTip(!openToolTip)}
            />
            <EditToolTip open={openToolTip} onClose={() => setOpenToolTip(false)} dish={dish} />
          </div>
        </>
      )}
    </div>
  );
};
