/* eslint-disable no-console */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { InputText } from '../../inputText/inputText.view';
import styles from './dishForm.module.css';
import { DISH } from '../../../router/router';
import { isNumber, isRequired } from '../../../assets/utils/validations.utils';

export const DishForm = ({ courseList }) => {
  const [dishName, setDishName] = useState();
  const [selectedCourse, setSelectedCourse] = useState();
  const [price, setPrice] = useState();
  const [anyError, setAnyError] = useState(false);
  const { id } = useParams();

  const clearAll = () => {
    setDishName('');
    setSelectedCourse('');
    setPrice('');
  };
  const validate = () => {
    const hasError = Object.keys(anyError).find((key) => {
      return anyError[key];
    });
    return hasError && hasError.length > 0;
  };

  const validateAndFetch = () => {
    if (validate()) {
      console.debug('failed to fetch');
      return null;
    }
    shortFetch({
      url: DISH,
      method: 'POST',
      body: { name: dishName, price, Course: selectedCourse, Restaurant: { id } },
    });
    return clearAll();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <InputText
          placeholder="Dish Name"
          value={dishName}
          handleChange={setDishName}
          inputId="resDishName"
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          validations={[{ func: isRequired, message: 'this field is required' }]}
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
          onError={(isError) => setAnyError({ ...anyError, name: isError })}
          validations={[
            { func: isRequired, message: 'this field is required' },
            { func: isNumber, message: "Please use numbers and '.'" },
          ]}
        />
      </div>
      <div className={`${styles.subContainer} ${styles.buttons}`}>
        <button>cancel</button>
        <button onClick={validateAndFetch}>create</button>
      </div>
    </div>
  );
};
