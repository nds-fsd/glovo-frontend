import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePage } from '../../../../hooks/usePage';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import Button from '../../../button';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './createCourseModal.module.css';

export const CreateCourseModal = ({ onClose, open }) => {
  const {
    state: { selectedCourse },
  } = useBackOfficeContext();
  const { createOrEditElement: createOrEditCourse } = usePage('course');
  const { id } = useParams();
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [courseName, setCourseName] = useState(selectedCourse ? selectedCourse.name : '');

  const handleClick = () => {
    if (!selectedCourse.name) {
      createOrEditCourse({
        body: {
          Restaurant: id,
          name: courseName,
        },
        onSuccess: () => {
          setIsCreated(true);
        },
      });
      return;
    }
    createOrEditCourse({
      body: { name: courseName },
      id: selectedCourse.id,
      onSuccess: () => setIsUpdated(true),
    });
  };

  return (
    <BackOfficeModal
      onClose={() => {
        onClose();
        setIsCreated(false);
        setIsUpdated(false);
      }}
      open={open}
    >
      <div className={styles.container}>
        {!isCreated && !isUpdated && (
          <>
            <h3>{selectedCourse.name ? 'Edit Course' : 'Create Course'}</h3>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                defaultValue={selectedCourse && selectedCourse.name}
                type="text"
                placeholder="Course Name"
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button buttonStyle="signup" onClick={onClose}>
                Cancel
              </Button>
              <Button buttonStyle="primary" onClick={() => handleClick()}>
                {selectedCourse.name ? 'Edit' : 'Create'}
              </Button>
            </div>
          </>
        )}
        {isCreated && <h3>Course Created Successfully</h3>}
        {isUpdated && <h3>Course Updated Successfully</h3>}
      </div>
    </BackOfficeModal>
  );
};
