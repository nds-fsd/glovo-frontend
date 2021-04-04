import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, onClose }) => {
  return (
    <>
      (
      <div className={styles._closeContainer} onClick={onClose}>
        <div className={styles._container}>
          <div className={styles._modal}>
            {children}
            <button className={styles._btnClose} onClick={onClose}>
              X
            </button>
          </div>
        </div>
      </div>
      )
    </>
  );
};

export default Modal;
