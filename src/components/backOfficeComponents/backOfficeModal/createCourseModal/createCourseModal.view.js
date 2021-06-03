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
    categoryState: { editModal, category },
  } = useBackOfficeContext();
  const { createOrEditElement: createOrEditCourse } = usePage('course');
  const { createOrEditElement: createOrEditCategory } = usePage('restaurantCategory');
  const { id } = useParams();
  const [isCreated, setIsCreated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [courseName, setCourseName] = useState(selectedCourse ? selectedCourse.name : '');
  const [categoryName, setCategoryName] = useState(category?.name || '');

  const handleClick = () => {
    if (!selectedCourse.name && !editModal) {
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
    if (!editModal) {
      createOrEditCourse({
        body: { name: courseName },
        id: selectedCourse.id,
        onSuccess: () => setIsUpdated(true),
      });
      return;
    }
    if (category._id) {
      createOrEditCategory({
        body: { name: categoryName },
        id: category._id,
        onSuccess: () => setIsUpdated(true),
      });
      return;
    }
    if (!category._id && editModal) {
      createOrEditCategory({
        body: {
          name: categoryName,
        },
        onSuccess: () => {
          setIsCreated(true);
        },
      });
    }
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
            {selectedCourse && !editModal && (
              <h3>{selectedCourse.name ? 'Edit Course' : 'Create Course'}</h3>
            )}
            {category && editModal && (
              <h3>{category.name ? 'Edit Category' : 'Create Category'}</h3>
            )}
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                defaultValue={selectedCourse?.name || category?.name}
                type="text"
                placeholder={`${!editModal ? 'Course' : 'Category'} name`}
                onChange={(e) => {
                  if (!editModal) {
                    setCourseName(e.target.value);
                    return;
                  }
                  setCategoryName(e.target.value);
                }}
              />
            </div>
            <div className={styles.buttonContainer}>
              <Button buttonStyle="signup" onClick={onClose}>
                Cancel
              </Button>
              <Button buttonStyle="primary" onClick={() => handleClick()}>
                {selectedCourse.name || category._id ? 'Edit' : 'Create'}
              </Button>
            </div>
          </>
        )}
        {isCreated && <h3>Created Successfully</h3>}
        {isUpdated && <h3>Updated Successfully</h3>}
      </div>
    </BackOfficeModal>
  );
};
