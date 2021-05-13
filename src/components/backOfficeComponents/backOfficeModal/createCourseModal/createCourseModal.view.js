import React, { useState } from 'react';
import Button from '../../../button';
import { BackOfficeModal } from '../backOfficeModal.view';
import styles from './createCourseModal.module.css';

export const CreateCourseModal = ({ onClose, open }) => {
  const [isCreated, setIsCreated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [courseName, setCourseName] = useState('');

  return (
    <BackOfficeModal onClose={onClose} open={open}>
      <div className={styles.container}>
        {!isCreated && (
          <>
            <h3>Create Course</h3>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                placeholder="Course Name"
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button buttonStyle="signup" onClick={onClose}>
                Cancel
              </Button>
              <Button buttonStyle="primary" onClick={() => setIsCreated(true)}>
                Create
              </Button>
            </div>
          </>
        )}
        {isCreated && <h3>Course Created Successfully</h3>}
      </div>
    </BackOfficeModal>
  );
};
