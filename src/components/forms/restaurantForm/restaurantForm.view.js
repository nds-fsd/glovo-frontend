/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../router/router';
import CategorySelect from '../../categorySelect';
import { InputText } from '../../inputText/inputText.view';
import styles from './restaurantForm.module.css';

export const RestaurantForm = ({ handleCategories, categories }) => {
  const [description, setDescription] = useState();
  const [categoryError, setCategoryError] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    if (data && categories.length > 0) {
      //   shortFetch({url: RESTAURANT,
      //     method: 'POST',
      //     body: {
      //       name,
      //       restaurantDescription: description,
      //       open: true,
      //       address: {
      //         number,
      //         street,
      //         zipcode,
      //       },
      //       restaurantCategory: category,
      //     },})
    }
    console.debug(data, description, categories);
  };

  useEffect(() => {
    if (categories.length === 0) {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);
  }, [categories]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <div className={styles.category_and_name}>
          <div className={styles.inputContainerA}>
            <input
              className={styles.input}
              type="text"
              placeholder="Name"
              {...register('name', { required: 'Restaurant name is required' })}
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
          </div>
          {categoryError && <p className={styles.errorMessage}>Please choose at least one</p>}
          <CategorySelect
            onChange={(e) => {
              handleCategories(e);
            }}
          />
        </div>
        <div className={styles.address}>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="Street"
              {...register('street', { required: 'Street name is required' })}
            />
            {errors.street && <p className={styles.errorMessage}>{errors.street.message}</p>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="Number"
              {...register('number', {
                required: 'Street number is required',
                pattern: {
                  value: /^-?\d+\.?\d*$/,
                  message: 'please enter a valid number',
                },
              })}
            />
            {errors.number && <p className={styles.errorMessage}>{errors.number.message}</p>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="Zipcode"
              {...register('zipcode', {
                required: 'zipcode number is required',
                pattern: {
                  value: /^\d{5}$/,
                  message: 'zipcode must be 5 digits',
                },
              })}
            />
            {errors.zipcode && <p className={styles.errorMessage}>{errors.zipcode.message}</p>}
          </div>
        </div>
      </div>
      <div className={styles.text_and_submit}>
        <div className={styles.textAreaContainer}>
          <textarea
            className={styles.textArea}
            placeholder="  Restaurant Description"
            onBlur={(e) => setDescription(e.target.value)}
          />
        </div>
        <input className={styles.submit} type="submit" />
      </div>
    </form>
  );
};
