/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../router/router';
import CategorySelect from '../../categorySelect';
import { InputText } from '../../inputText/inputText.view';
import styles from './restaurantForm.module.css';
import {
  isRequired,
  minLength,
  isNumber,
  numLength,
} from '../../../assets/utils/validations.utils';

export const RestaurantForm = ({ enableButtons, storeCreated }) => {
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [zipcode, setZipcode] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [anyError, setAnyError] = useState({ name: true });

  const handleDisable = () => {
    const hasError = Object.keys(anyError).find((key) => {
      return anyError[key];
    });
    return hasError && hasError.length > 0;
  };

  const validateAndFetch = () => {
    if (handleDisable()) {
      console.debug('failed to fetch');
      return null;
    }
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
    return storeCreated;
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
          validations={[
            { func: isRequired, message: 'this field is required' },
            { func: minLength, message: 'minLength is 5' },
          ]}
        />
      </div>
      <div className={`${styles.subContainer} ${styles.category}`}>
        <CategorySelect handleChange={(value) => setCategory(value)} categoryValue={category} />
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
        <InputText
          placeholder="street"
          value={street}
          handleChange={setStreet}
          inputId="resStreet"
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          validations={[{ func: isRequired, message: 'this field is required' }]}
        />
        <InputText
          placeholder="number"
          value={number}
          handleChange={setNumber}
          inputId="resNumber"
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          validations={[
            { func: isRequired, message: 'this field is required' },
            { func: isNumber, message: 'it has to be a numba' },
          ]}
        />
        <InputText
          placeholder="Zipcode"
          value={zipcode}
          handleChange={setZipcode}
          inputId="resZipcode"
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          validations={[
            { func: isRequired, message: 'this field is required' },
            { func: numLength, message: 'please add a valid zipcode' },
          ]}
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
