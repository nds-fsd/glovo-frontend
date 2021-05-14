import React, { useState } from 'react';
import { useRestaurants } from '../../../../hooks/useRestaurants';
import Button from '../../../button';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './deleteRestaurantModal.module.css';
import { useCourses } from '../../../../hooks/useCourses';
import { BACK_TO_COURSES } from '../../../../pages/backOfficePage/backOfficeContext/types';

export const DeleteRestaurantModal = ({ onClose, open }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    dispatch,
    state: { deletableRestaurant, deletableCourse },
  } = useBackOfficeContext();
  const { deleteRestaurant } = useRestaurants();
  const { deleteCourses } = useCourses();

  const handleSuccess = () => {
    setIsDeleted(true);
  };
  const handleError = () => {
    setIsDeleted(false);
  };

  const handleClick = () => {
    if (deletableCourse.id) {
      deleteCourses({
        courseId: deletableCourse.id,
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
        {isDeleted && !deletableCourse.id && <h3>Restaurant Deleted Successfully</h3>}
        {isDeleted && deletableCourse.id && <h3>Course Deleted Successfully</h3>}
      </div>
    </BackOfficeModal>
  );
};
