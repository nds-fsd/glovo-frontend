/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND } from '../../../router/router';
import styles from './restaurantUpdateForm.module.css';
import InputText from '../../inputText';
import CategorySelect from '../../categorySelect';
import Button from '../../button';

export const RestaurantUpdateForm = ({ onClose }) => {
  const [updateName, setUpdateName] = useState('');
  const [updateCategory, setUpdateCategory] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [nameError, setNameError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const { id } = useParams();

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

    if (!updateDescription || updateDescription.toString().length < 5) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
    const body = {
      name: updateName,
      restaurantCategory: updateCategory,
      restaurantDescription: updateDescription,
    };
    const options = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    fetch(`${BACKEND}/restaurant/${id}`, options)
      .then((response) => response.json())
      .then((resto) => console.log(resto))
      .catch((err) => console.log(err));

    onClose();
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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};
