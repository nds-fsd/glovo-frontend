import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { CHANGE_ROLE, DELETE_USER } from '../../../../pages/backOfficePage/backOfficeContext/types';
import styles from './changeRoleToolTip.module.css';

export const ChangeRoleToolTip = ({ open, onClose, user }) => {
  const ref = useRef(null);
  const { userDispatch } = useBackOfficeContext();
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
          userDispatch({ type: CHANGE_ROLE, payload: user });
        }}
      >
        Edit
      </div>
      <div
        className={`${styles.option} ${styles.delete}`}
        onClick={() => {
          userDispatch({ type: DELETE_USER, payload: user });
        }}
      >
        Delete
      </div>
    </div>
  );
};
