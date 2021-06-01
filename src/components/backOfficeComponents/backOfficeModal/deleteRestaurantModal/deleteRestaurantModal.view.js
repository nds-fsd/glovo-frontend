import React, { useState } from 'react';
import Button from '../../../button';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './deleteRestaurantModal.module.css';
import { BACK_TO_COURSES } from '../../../../pages/backOfficePage/backOfficeContext/types';
import { usePage } from '../../../../hooks/usePage';
import { COURSE, DISH, RESTAURANT, USER } from '../../../../router/router';
import check from '../../../../assets/images/animation_500_kp9ok9m7.gif';

export const DeleteRestaurantModal = ({ onClose, open }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    dispatch,
    state: { deletableRestaurant, deletableCourse, deletableDish },
    userState: { user },
  } = useBackOfficeContext();
  const { deleteElement } = usePage();

  const handleSuccess = () => {
    setIsDeleted(true);
  };
  const handleError = () => {
    setIsDeleted(false);
  };

  const handleClick = () => {
    if (user) {
      deleteElement({ path: USER, id: user._id, onSuccess: handleSuccess });
      return;
    }
    if (deletableDish && !deletableRestaurant) {
      deleteElement({ path: DISH, id: deletableDish, onSuccess: handleSuccess });
      return;
    }
    if (deletableCourse) {
      deleteElement({
        path: COURSE,
        id: deletableCourse,
        onSuccess: handleSuccess,
      });
      return;
    }
    deleteElement({
      path: RESTAURANT,
      id: deletableRestaurant,
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <BackOfficeModal
      onClose={() => {
        onClose();
        setIsDeleted(false);
        dispatch({ type: BACK_TO_COURSES });
      }}
      open={open}
    >
      <div className={styles.container}>
        {!isDeleted && (
          <>
            <h3>Are You sure?</h3>
            <div className={styles.buttonContainer}>
              <Button buttonStyle="signup" onClick={onClose}>
                Cancel
              </Button>
              <Button buttonStyle="delete" onClick={() => handleClick()}>
                Delete
              </Button>
            </div>
          </>
        )}
        {isDeleted && (
          <div className={styles.isDeleted}>
            <img className={styles.image} src={check} alt="check" />
            <h3>Deleted Successfully</h3>
          </div>
        )}
      </div>
    </BackOfficeModal>
  );
};
