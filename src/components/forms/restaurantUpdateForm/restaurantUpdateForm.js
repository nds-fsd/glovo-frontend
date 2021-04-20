/* eslint-disable no-console */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BACKEND } from '../../../router/router';
import styles from './restaurantUpdateForm.module.css';
import InputText from '../../inputText';
import CategorySelect from '../../categorySelect';
// import Button from '../../button';
import { isRequired, minLength } from '../../../assets/utils/validations.utils';

export const RestaurantUpdateForm = ({ onClose }) => {
  const { id } = useParams();
  const [updateName, setUpdateName] = useState();
  const [updateCategory, setUpdateCategory] = useState();
  const [updateDescription, setUpdateDescription] = useState();
  const [anyError, setAnyError] = useState({ name: true });

  const handleDisable = () => {
    const hasError = Object.keys(anyError).find((key) => {
      return anyError[key];
    });
    return hasError && hasError.length > 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleDisable()) {
      console.log('failed');
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
      .then((resto) => {
        console.log(resto);
      })
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
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          validations={[
            { func: isRequired, message: 'this field is required' },
            { func: minLength, message: 'minLength is 5' },
          ]}
        />
        <CategorySelect
          handleChange={(value) => setUpdateCategory(value)}
          categoryValue={updateCategory}
          label="Categoria"
        />
        <InputText
          placeholder="Enter a new description"
          label="Description"
          value={updateDescription}
          handleChange={setUpdateDescription}
          inputId="resNewDescription"
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          validations={[
            { func: isRequired, message: 'this field is required' },
            { func: minLength, message: 'minLength is 5' },
          ]}
        />
        <div className={styles._btnContainer}>
          <input type="button" value="Cancel" onClick={onClose} className={styles._btn} />
          <input type="submit" value="Submit" className={styles._btn} />
        </div>
      </form>
    </div>
  );
};
