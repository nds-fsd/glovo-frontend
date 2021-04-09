/* eslint-disable no-debugger */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { RESTAURANT, RESTAURANT_CATEGORY } from '../../../router/router';
import CategorySelect from '../../categorySelect';
import { InputText } from '../../inputText/inputText.view';
import styles from './restaurantForm.module.css';
import { isRequired, minLength } from '../../../assets/utils/validations.utils';

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
  const [anyError, setAnyError] = useState({ name: true });

  const history = useHistory();

  const handleDisable = () => {
    const hasError = Object.keys(anyError).find((key) => {
      console.debug(key);
      return anyError[key];
    });
    console.debug('.......', hasError, anyError);
    return hasError && hasError.length > 0;
  };

  const validateAndFetch = () => {
    let error = false;
    if (!name) {
      setNameError(true);
      error = true;
    } else {
      setNameError(false);
    }
    if (!zipcode || isNaN(zipcode) || zipcode.toString().length < 5) {
      setZipcodeError(true);
      error = true;
    } else {
      setZipcodeError(false);
    }
    if (number <= 0 || isNaN(number)) {
      setNumberError(true);
      error = true;
    } else {
      setNumberError(false);
    }
    if (error) {
      console.debug('failed to fetch');
      return null;
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
          restaurantCategory: category,
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
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          errorMessage="Please add a Name"
          validations={[
            { func: isRequired, message: 'this field is required' },
            { func: minLength, message: 'minLength is 5' },
          ]}
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
          value={number}
          handleChange={setNumber}
          inputId="resNumber"
          error={numberError}
          errorMessage="Please add a Number"
        />
        <InputText
          placeholder="Zipcode"
          value={zipcode}
          handleChange={setZipcode}
          inputId="resZipcode"
          error={zipcodeError}
          errorMessage="Please add a valid zipcode"
        />
      </div>
      <div className={`${styles.subContainer} ${styles.buttons}`}>
        <button onClick={() => location.reload()}>cancel</button>
        <button disabled={handleDisable()} onClick={validateAndFetch}>
          create
        </button>
      </div>
    </div>
  );
};
