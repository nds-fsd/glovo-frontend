import React, { useContext, useState } from 'react';
import { useRestaurants } from '../../../../hooks/useRestaurants';
import Button from '../../../button';
import { backOfficeContext } from '../../../context/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './deleteRestaurantModal.module.css';

export const DeleteRestaurantModal = ({ onClose, open }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const { deletableRestaurant } = useContext(backOfficeContext);
  const { deleteRestaurant } = useRestaurants();

  const handleSucces = () => {
    setIsDeleted(true);
  };
  const handleError = () => {
    setIsDeleted(false);
  };

  return (
    <BackOfficeModal onClose={onClose} open={open}>
      <div className={styles.container}>
        {!isDeleted && (
          <>
            <h3>Are You sure?</h3>
            <div className={styles.buttonContainer}>
              <Button buttonStyle="signup" onClick={onClose}>
                Cancel
              </Button>
              <Button
                buttonStyle="delete"
                onClick={() => deleteRestaurant(deletableRestaurant, handleSucces, handleError)}
              >
                Delete
              </Button>
            </div>
          </>
        )}
        {isDeleted && <h3>Restaurant Deleted Successfully</h3>}
      </div>
    </BackOfficeModal>
  );
};
