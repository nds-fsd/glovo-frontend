import React, { useContext } from 'react';
import { useRestaurants } from '../../../../hooks/useRestaurants';
import Button from '../../../button';
import { backOfficeContext } from '../../../context/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './deleteRestaurantModal.module.css';

export const DeleteRestaurantModal = ({ onClose, open }) => {
    const { deletableRestaurant } = useContext(backOfficeContext);
    const { deleteRestaurant } = useRestaurants();

  return (
    <BackOfficeModal onClose={onClose} open={open}>
      <div className={styles.container}>
        <h3>Are You sure?</h3>
        <div className={styles.buttonContainer}>
          <Button buttonStyle="signup" onClick={onClose}>
            Cancel
          </Button>
          <Button buttonStyle="delete">Delete</Button>
        </div>
      </div>
    </BackOfficeModal>
  );
};
