import React from 'react';
import Modal from '../modal';
import styles from './dishModal.module.css';

export const DishModal = ({ selectedDish, onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className={styles.container}>
        <p>{selectedDish.name}</p>
        <p>{selectedDish.price}</p>
        <p>{selectedDish.description}</p>
        <p>{selectedDish.id}</p>
      </div>
    </Modal>
  );
};
