/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { InputText } from '../inputText/inputText.view';
import styles from './dishForm.module.css';
import { DISH } from '../../router/router';

export const DishForm = ({ courseList }) => {
  const [dishName, setDishName] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [price, setPrice] = useState();
  const [priceError, setPriceError] = useState(false);
  const [dishError, setDishError] = useState(false);
  const { id } = useParams();

  const clearAll = () => {
    setDishName('');
    setSelectedCourse('');
    setPrice('');
  };

  const validateAndFetch = () => {
    let error = false;
    if (!dishName) {
      setDishError(true);
      error = true;
    } else {
      setDishError(false);
    }
    if (!price || isNaN(price)) {
      setPriceError(true);
      error = true;
    } else {
      setPriceError(false);
    }
    if (error) {
      console.debug('failed to fetch');
      return null;
    }
    shortFetch({
      url: DISH,
      method: 'POST',
      body: { name: dishName, price, Course: selectedCourse, Restaurant: { id } },
    });
    clearAll();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <InputText
          placeholder="Dish Name"
          value={dishName}
          handleChange={setDishName}
          inputId="resDishName"
          error={dishError}
          errorMessage="Please add a Name "
        />
      </div>
      <div className={`${styles.subContainer} ${styles.category}`}>
        <select onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="" selected disabled hidden>
            Select a Course
          </option>
          {courseList.map((course) => (
            <option value={course._id}>{course.name}</option>
          ))}
        </select>
      </div>
      <div className={`${styles.subContainer} ${styles.description}`}>
        <input type="text" placeholder="Dish description" />
      </div>
      <div className={`${styles.subContainer} ${styles.price}`}>
        <InputText
          placeholder="Price"
          value={price}
          handleChange={setPrice}
          inputId="resPrice"
          error={priceError}
          errorMessage="Please use numbers and '.' "
        />
      </div>
      <div className={`${styles.subContainer} ${styles.buttons}`}>
        <button>cancel</button>
        <button onClick={validateAndFetch}>create</button>
      </div>
    </div>
  );
};
