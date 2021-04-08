/* eslint-disable no-console */
import React, { useState } from 'react';
import styles from './restaurantUpdateForm.module.css';
import InputText from '../inputText';
import CategorySelect from '../categorySelect';
import Button from '../button';

export const RestaurantUpdateForm = ({ onClose }) => {
  const [updateName, setUpdateName] = useState();
  // eslint-disable-next-line no-unused-vars
  const [updateCategory, setUpdateCategory] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!updateName || updateName.toString().length < 2) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (updateCategory === undefined) {
      setCategoryError(true);
    } else {
      setCategoryError(false);
    }

    if (!updateDescription || updateDescription.toString().length < 25) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };

  return (
    <div className={styles._container}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <InputText
          placeholder="Enter a new name"
          label="name"
          value={updateName}
          handleChange={setUpdateName}
          inputId="resNewName"
          error={nameError}
          errorMessage="Please add a valid name"
        />
        <CategorySelect
          categoryValue={(value) => setUpdateCategory(value)}
          error={categoryError}
          errorMessage="Please select a category"
        />
        <InputText
          placeholder="Enter a new description"
          label="Description"
          value={updateDescription}
          handleChange={setUpdateDescription}
          inputId="resNewDescription"
          error={descriptionError}
          errorMessage="Please add a valid description"
        />
        <Button onClose={onClose}>CANCEL</Button>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};
