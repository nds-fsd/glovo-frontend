import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, onClose }) => {
  return (
    <>
      (<div className={styles._closeContainer} onClick={onClose}></div>
      <div className={styles._container}>
        <div className={styles._modal}>
          {children}
          <button className={styles._btnClose} onClick={onClose}>
            X
          </button>
        </div>
      </div>
      )
    </>
  );
};

export default Modal;
