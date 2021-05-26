import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import EditToolTip from '../toolTip';
import styles from './row.module.css';

import { BACKOFFICE } from '../../../router/router';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { VIEW_RESTAURANT } from '../../../pages/backOfficePage/backOfficeContext/types';

export const Row = ({ restaurant }) => {
  const { dispatch } = useBackOfficeContext();
  const [popUp, setPopUp] = useState(false);
  const [openToolTip, setOpenToolTip] = useState(false);
  const history = useHistory();
  return (
    <div className={styles.row}>
      {restaurant && (
        <>
          <div
            className={`${styles.column} ${styles.name}`}
            style={{ width: '32%', color: 'black' }}
            onClick={() => {
              dispatch({ type: VIEW_RESTAURANT, payload: restaurant.name });
              history.push(`${BACKOFFICE}/${restaurant._id}`);
            }}
          >
            {restaurant.name}
          </div>
          <div
            className={styles.column}
            onMouseEnter={() => setPopUp(true)}
            onMouseLeave={() => setPopUp(false)}
            style={{ width: '15%' }}
          >
            <p style={{ color: 'var(--salyBlue)' }}> Categories </p>
            {popUp && (
              <div className={styles.popUp}>
                {restaurant.restaurantCategory.map((category) => (
                  <p key={category._id} className={styles.category}>
                    {category.name}
                  </p>
                ))}
              </div>
            )}
          </div>
          <div className={styles.description}>{restaurant.restaurantDescription}</div>
          <div className={styles.column} style={{ width: '20%' }}>
            {restaurant.createdAt.slice(0, 10)}
          </div>
          <div style={{ position: 'relative' }}>
            <FontAwesomeIcon
              icon="ellipsis-v"
              className={styles.icon}
              onClick={() => setOpenToolTip(!openToolTip)}
            />
            <EditToolTip
              open={openToolTip}
              onClose={() => setOpenToolTip(false)}
              restaurant={restaurant}
            />
          </div>
        </>
      )}
    </div>
  );
};
