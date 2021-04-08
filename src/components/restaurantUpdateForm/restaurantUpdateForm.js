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

  return (
    <div className={styles._container}>
      <form>
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
        <Button onClick={onClose}>CANCEL</Button>
        <Button>CREATE</Button>
      </form>
    </div>
  );
};
