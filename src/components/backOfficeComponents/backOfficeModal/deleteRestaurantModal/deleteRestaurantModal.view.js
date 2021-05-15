import React, { useState } from 'react';
import { useRestaurants } from '../../../../hooks/useRestaurants';
import Button from '../../../button';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './deleteRestaurantModal.module.css';
import { useCourses } from '../../../../hooks/useCourses';
import { BACK_TO_COURSES } from '../../../../pages/backOfficePage/backOfficeContext/types';
import { useDishes } from '../../../../hooks/useDishes';

export const DeleteRestaurantModal = ({ onClose, open }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    dispatch,
    state: { deletableRestaurant, deletableCourse, deletableDish },
  } = useBackOfficeContext();
  const { deleteRestaurant } = useRestaurants();
  const { deleteCourses } = useCourses();
  const { deleteDishes } = useDishes();

  const handleSuccess = () => {
    setIsDeleted(true);
  };
  const handleError = () => {
    setIsDeleted(false);
  };

  const handleClick = () => {
    if (deletableDish) {
      deleteDishes({ dishId: deletableDish, onSuccess: handleSuccess });
      return;
    }
    if (deletableCourse) {
      deleteCourses({
        courseId: deletableCourse,
        onSuccess: handleSuccess,
      });
      return;
    }
    deleteRestaurant(deletableRestaurant, handleSuccess, handleError);
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
        {isDeleted && deletableRestaurant && <h3>Restaurant Deleted Successfully</h3>}
        {isDeleted && deletableCourse && <h3>Course Deleted Successfully</h3>}
        {isDeleted && deletableDish && <h3>Dish Deleted Successfully</h3>}
      </div>
    </BackOfficeModal>
  );
};
