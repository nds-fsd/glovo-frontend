import React, { useState } from 'react';
import styles from './modal.module.css';

const Modal = ({ children }) => {
  const [closeModal, setCloseModal] = useState(true);

  const handleClose = () => {
    setCloseModal(false);
  };
  return (
    <>
      {closeModal && (
        <div className={styles._container}>
          <div className={styles._modal}>
            {children}
            <button className={styles._btnClose} onClick={handleClose}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
