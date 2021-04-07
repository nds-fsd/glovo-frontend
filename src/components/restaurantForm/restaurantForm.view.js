/* eslint-disable no-debugger */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT, RESTAURANT_CATEGORY } from '../../router/router';
import CategorySelect from '../categorySelect';
import { InputText } from '../inputText/inputText.view';
import styles from './restaurantForm.module.css';

export const RestaurantForm = ({ enableButtons, storeCreated }) => {
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [zipcode, setZipcode] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [numberError, setNumberError] = useState(false);
  const [zipcodeError, setZipcodeError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [newRest, setNewRest] = useState();

  const hasErrors = () => {
    return numberError || zipcodeError || nameError;
  };
  const validateAndFetch = () => {
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!zipcode || isNaN(zipcode) || zipcode.toString().length < 5) {
      setZipcodeError(true);
    } else {
      setZipcodeError(false);
    }
    if (number <= 0 || isNaN(number)) {
      setNumberError(true);
    } else {
      setNumberError(false);
    }
    if (hasErrors()) {
      return console.debug('failed to fetch');
    } else {
      enableButtons();
      shortFetch({
        url: RESTAURANT,
        method: 'POST',
        body: {
          name,
          restaurantDescription: description,
          open: true,
          address: {
            number,
            street,
            zipcode,
          },
          RestaurantCategory: category,
        },
        onSuccess: storeCreated,
      });
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
        <CategorySelect categoryValue={(value) => setCategory(value)} />
      </div>
      <div className={`${styles.subContainer} ${styles.description}`}>
        <textarea
          id="resDesc"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please add your description"
        ></textarea>
      </div>
      <div className={`${styles.subContainer} ${styles.address}`}>
        <input
          type="text"
          value={street}
          placeholder="street"
          onChange={(e) => setStreet(e.target.value)}
        />
        <InputText
          placeholder="number"
          label="number"
          value={number}
          handleChange={setNumber}
          inputId="resNumber"
          error={numberError}
          errorMessage="Please add a Number"
        />
        <InputText
          placeholder="Zipcode"
          label="zipcode"
          value={zipcode}
          handleChange={setZipcode}
          inputId="resZipcode"
          error={zipcodeError}
          errorMessage="Please add a valid zipcode"
        />
      </div>
      <div className={`${styles.subContainer} ${styles.buttons}`}>
        <button onClick={() => location.reload()}>cancel</button>
        <button onClick={validateAndFetch}>create</button>
      </div>
    </div>
  );
};
