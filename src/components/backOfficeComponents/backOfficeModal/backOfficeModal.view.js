import classNames from 'classnames';
import React, { useRef, useEffect } from 'react';
import styles from './backOfficeModal.module.css';

export const BackOfficeModal = ({ children, onClose, open, title }) => {
  const ref = useRef(null);

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
    <div className={classNames([styles._backdrop], { [styles.open]: open })}>
      <div className={classNames([styles._modal], { [styles.open]: open })} ref={ref}>
        <div className={styles._modalHeader}>{title && <h2>{title}</h2>}</div>
        {children}
      </div>
    </div>
  );
};
