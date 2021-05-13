import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { EDIT_COURSE, VIEW_DISHES } from '../../../../pages/backOfficePage/backOfficeContext/types';
import styles from './subMenu.module.css';

export const SubMenu = ({ open, onClose, course }) => {
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
        onClick={() => {
          dispatch({ type: VIEW_DISHES, payload: { name: course.name, id: course._id } });
        }}
      >
        View Dishes
      </div>
      <div
        className={styles.option}
        onClick={() => {
          dispatch({ type: EDIT_COURSE, payload: { name: course.name, id: course._id } });
        }}
      >
        Edit
      </div>
      <div className={`${styles.option} ${styles.delete}`}>Delete</div>
    </div>
  );
};
