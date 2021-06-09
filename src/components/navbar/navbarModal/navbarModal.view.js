import React, { useRef, useEffect } from 'react';
import classNames from 'classnames';
import styles from './navbarModal.module.css';

export const NavbarModal = ({ children, onClose, open, modalStyle }) => {
  const ref = useRef(null);
  const selectedStyle = classNames({
    [styles.address]: modalStyle === 'address',
    [styles.delete]: modalStyle === 'delete',
  });

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
    <>
      {open && (
        <div className={styles._backdrop}>
          <div className={`${styles._modal} ${selectedStyle}`} ref={ref}>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
