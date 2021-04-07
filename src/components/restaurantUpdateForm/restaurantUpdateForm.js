/* eslint-disable no-console */
import React, { useState } from 'react';
import styles from './restaurantUpdateForm.module.css';
import InputText from '../inputText';
import CategorySelect from '../categorySelect';

export const RestaurantUpdateForm = () => {
  const [updateName, setUpdateName] = useState();
  // eslint-disable-next-line no-unused-vars
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
      <CategorySelect categoryValue={(value) => setUpdateCategory(value)} />
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
