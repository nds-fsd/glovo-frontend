/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { RESTAURANT_CATEGORY } from '../../router/router';
import { InputText } from '../inputText/inputText.view';
import styles from './restaurantForm.module.css';

export const RestaurantForm = ({ enableButtons }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [zipcode, setZipcode] = useState();
  const [street, setStreet] = useState();
  const [number, setNumber] = useState();
  const [zipcodeError, setZipcodeError] = useState(false);
  const [nameError, setNameError] = useState(false);

  useEffect(() => {
    shortFetch({ url: `${RESTAURANT_CATEGORY}`, onSuccess: setCategoryList, method: 'GET' });
  }, []);
  const validateAndFetch = () => {
    if (!name) {
      setNameError(true);
    } else {
      setNameError(false);
    }
    if (!zipcode || isNaN(zipcode) || zipcode < 10000) {
      setZipcodeError(true);
    } else {
      setZipcodeError(false);
    }
    enableButtons();
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
        <select>
          <option value="" selected disabled hidden>
            Select a Category
          </option>
          {categoryList.map((cat) => (
            <option value={cat._id}>{cat.name}</option>
          ))}
        </select>
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
        <input
          type="text"
          value={number}
          placeholder="number"
          onChange={(e) => setNumber(e.target.value)}
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
