/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { InputText } from '../inputText/inputText.view';
import styles from './restaurantForm.module.css';

export const RestaurantForm = () => {
  const [name, setName] = useState();
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState();

  const validateAndFetch = () => {
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <InputText
          placeholder="Name"
          label="Name"
          value={name}
          handleChange={setName}
          inputId="resName"
          error={nameError}
          errorMessage="Please add a Name"
        />
      </div>
      <div className={`${styles.subContainer} ${styles.category}`}>
        <textarea
          id="resDesc"
          className={styles.textarea}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please add your description"
        ></textarea>
      </div>
      <div className={`${styles.subContainer} ${styles.description}`}>
        <input type="text" placeholder="description" />
      </div>
      <div className={`${styles.subContainer} ${styles.address}`}>
        <input type="text" placeholder="street" />
        <input type="text" placeholder="number" />
        <input type="text" placeholder="Zip Code" />
      </div>
      <div className={`${styles.subContainer} ${styles.buttons}`}>
        <button>cancel</button>
        <button onClick={validateAndFetch}>create</button>
      </div>
    </div>
  );
};
