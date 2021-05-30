/* eslint-disable react/jsx-props-no-spreading */

import classNames from 'classnames';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { useDishes } from '../../../hooks/useDishes';
import styles from './dishForm.module.css';
import { STOP_CREATE_DISH } from '../../../pages/backOfficePage/backOfficeContext/types';
import { uploadImage } from '../../../assets/utils/imgUpload';

export const DishForm = ({ imgSetter }) => {
  const {
    dispatch,
    state: { selectedCourse, selectedDish },
    setDishImg,
    dishImg,
  } = useBackOfficeContext();
  const [description, setDescription] = useState(selectedDish?.description);
  const { createDishes, editDish } = useDishes();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSuccess = () => {
    dispatch({ type: STOP_CREATE_DISH });
    reset();
  };
  const onSubmit = (data) => {
    if (selectedDish.name) {
      editDish({ dishId: selectedDish.id, data, description, onSuccess, dishImg });
      imgSetter();
      return;
    }
    createDishes({ courseId: selectedCourse.id, data, description, onSuccess, dishImg });
    imgSetter();
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.imgInputContainer}>
        <input
          className={styles.imageInput}
          type="file"
          {...register('image')}
          onChange={(evt) => uploadImage(evt.target.files[0], setDishImg)}
        />
      </div>
      <div className={classNames([styles.inputContainer], { [styles.onError]: errors.name })}>
        <input
          className={styles.input}
          defaultValue={selectedDish?.name}
          type="text"
          placeholder="Dish Name"
          {...register('name', { required: 'Dish name is required' })}
        />

        {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
      </div>
      <div className={classNames([styles.inputContainer], { [styles.onError]: errors.price })}>
        <input
          className={styles.input}
          type="text"
          defaultValue={selectedDish?.price}
          placeholder="Price"
          {...register('price', {
            required: 'Price is required',
            pattern: {
              value: /^-?\d+\.?\d*$/,
              message: 'please enter a valid number',
            },
          })}
        />
        {errors.price && <p className={styles.errorMessage}>{errors.price.message}</p>}
      </div>
      <textarea
        className={styles.description}
        placeholder="Description"
        defaultValue={selectedDish && selectedDish.description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <input type="submit" className={styles.submit} />
    </form>
  );
};
