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

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <Button onClose={onClose}>CANCEL</Button>
        <input type="submit" value="Create" />
      </form>
    </div>
  );
};
