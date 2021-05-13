import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import {
  DELETE_RESTAURANT,
  SELECT_RESTAURANT,
  VIEW_MENU,
} from '../../../../pages/backOfficePage/backOfficeContext/types';
import { BACKOFFICE } from '../../../../router/router';
import styles from './editToolTip.module.css';

export const EditToolTip = ({ open, onClose, restaurant }) => {
  const ref = useRef(null);
  const { dispatch } = useBackOfficeContext();
  const history = useHistory();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target) && open) {
        onClose();
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [ref, open]);
  return (
    <div className={classNames(styles.container, { [styles.open]: open })} ref={ref}>
      <div
        className={styles.option}
        onClick={() => {
          dispatch({ type: SELECT_RESTAURANT, payload: restaurant.name });
          dispatch({ type: VIEW_MENU });
          history.push(`${BACKOFFICE}/${restaurant._id}`);
        }}
      >
        View Menu
      </div>
      <div
        className={`${styles.option} ${styles.delete}`}
        onClick={() => {
          dispatch({ type: DELETE_RESTAURANT, payload: restaurant._id });
        }}
      >
        Delete
      </div>
    </div>
  );
};
