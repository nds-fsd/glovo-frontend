import classNames from 'classnames';
import React, { useContext, useEffect, useRef } from 'react';
import { backOfficeContext } from '../../../context/backOfficeContext';
import styles from './editToolTip.module.css';

export const EditToolTip = ({ open, onClose, restaurant }) => {
  const ref = useRef(null);
  const { changeTab, setDeleteRestaurantModal, setDeletableRestaurant } = useContext(
    backOfficeContext
  );
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
      <div className={styles.option} onClick={() => changeTab(restaurant.name)}>
        View Menu
      </div>
      <div
        className={`${styles.option} ${styles.delete}`}
        onClick={() => {
          setDeleteRestaurantModal(true);
          setDeletableRestaurant(restaurant._id);
        }}
      >
        Delete
      </div>
    </div>
  );
};
