import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import {
  CHANGE_TAB,
  DELETE_RESTAURANT,
} from '../../../../pages/backOfficePage/backOfficeContext/types';
import styles from './editToolTip.module.css';

export const EditToolTip = ({ open, onClose, restaurant }) => {
  const ref = useRef(null);
  const { dispatch } = useBackOfficeContext();
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
        onClick={() => dispatch({ type: CHANGE_TAB, payload: restaurant.name })}
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
