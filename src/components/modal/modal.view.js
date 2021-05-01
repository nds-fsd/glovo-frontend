import React, { useRef } from 'react';
import { useEffect } from 'react/cjs/react.development';
import styles from './modal.module.css';

const Modal = ({ children, onClose, open, title }) => {
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
    <>
      {open && (
        <div className={styles._backdrop}>
          <div className={styles._modal} ref={ref}>
            <div className={styles._modalHeader}>{title && <h2>{title}</h2>}</div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
