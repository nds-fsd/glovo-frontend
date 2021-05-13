import React, { useState } from 'react';
import { useRestaurants } from '../../../../hooks/useRestaurants';
import Button from '../../../button';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './deleteRestaurantModal.module.css';
import { useCourses } from '../../../../hooks/useCourses';

export const DeleteRestaurantModal = ({ onClose, open }) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    state: { deletableRestaurant, selectedCourse },
  } = useBackOfficeContext();
  const { deleteRestaurant } = useRestaurants();
  const { deleteCourse } = useCourses();

  const handleSucces = () => {
    setIsDeleted(true);
  };
  const handleError = () => {
    setIsDeleted(false);
  };

  const handleClick = () => {
    if (selectedCourse.id) {
      deleteCourse({
        courseId: selectedCourse.id,
        onSuccess: () => {
          setIsDeleted(true);
        },
      });
    }
    deleteRestaurant(deletableRestaurant, handleSucces, handleError);
  };

  return (
    <BackOfficeModal
      onClose={() => {
        onClose();
        setIsDeleted(false);
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
        {isDeleted && <h3>Restaurant Deleted Successfully</h3>}
      </div>
    </BackOfficeModal>
  );
};
