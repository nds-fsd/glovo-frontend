import React, { useState } from 'react';
import styles from './restaurantUpdateForm.module.css';
import InputText from '../inputText';

export const RestaurantUpdateForm = () => {
  const [updateName, setUpdateName] = useState();
  const [updateCategory, setUpdateCategory] = useState();
  const [updateDescription, setUpdateDescription] = useState();

  return (
    <div className={styles._container}>
      <InputText
        placeholder="Enter a new name"
        label="name"
        value={updateName}
        handleChange={setUpdateName}
        inputId="resNewName"
        errorMessage="Please add a valid name"
      />
      <InputText
        placeholder="Enter a new category"
        label="Category"
        value={updateCategory}
        handleChange={setUpdateCategory}
        inputId="resNewCategory"
        errorMessage="Please add a valid name"
      />
      <InputText
        placeholder="Enter a new description"
        label="Description"
        value={updateDescription}
        handleChange={setUpdateDescription}
        inputId="resNewDescription"
        errorMessage="Please add a valid name"
      />
    </div>
  );
};
