import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import styles from './row.module.css';

import { BACKOFFICE } from '../../../router/router';

export const Row = ({ restaurant }) => {
  const [popUp, setPopUp] = useState(false);
  const history = useHistory();
  return (
    <div className={styles.row}>
      {restaurant && (
        <>
          <div
            className={styles.column}
            style={{ width: '32%' }}
            onClick={() => history.push(`${BACKOFFICE}/${restaurant._id}`)}
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
                  <p className={styles.category}>{category.name}</p>
                ))}
              </div>
            )}
          </div>
          <div className={styles.description}>{restaurant.restaurantDescription}</div>
          <div className={styles.column} style={{ width: '20%' }}>
            {restaurant.createdAt.slice(0, 10)}
          </div>
          <FontAwesomeIcon icon="ellipsis-v" />
        </>
      )}
    </div>
  );
};
