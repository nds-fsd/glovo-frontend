/* eslint-disable no-alert */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { getUserSession } from '../../../assets/utils/localStorage.utils';
import { useRestaurants } from '../../../hooks/useRestaurants';
import { RESTAURANT } from '../../../router/router';
import Button from '../../button';
import CategorySelect from '../../categorySelect';
import { backOfficeContext } from '../../context/backOfficeContext';
import { InputText } from '../../inputText/inputText.view';
import styles from './restaurantForm.module.css';

/**
 * @param handleCategories  to save, edit or delete the array of categories
 * @param  categories array of objects {name, _id } of the categories
 */
export const RestaurantForm = ({ handleCategories, categories, restaurant, onUpdate }) => {
  const { setCreateRestaurant } = useContext(backOfficeContext);
  const { createRestaurant, updateRestaurant } = useRestaurants();
  const [description, setDescription] = useState(restaurant && restaurant.restaurantDescription);
  const [categoryError, setCategoryError] = useState(false);
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    if (!restaurant) {
      createRestaurant({ categories, data, description, setCreateRestaurant });
      return;
    }
    if (restaurant) {
      if (data && categories.length > 0) {
        updateRestaurant({ data, categories, id, description, setCreateRestaurant });
        onUpdate();
      }
    }
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
              defaultValue={restaurant && restaurant.name}
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
              defaultValue={restaurant && restaurant.address.street}
              {...register('street', { required: 'Street name is required' })}
            />
            {errors.street && <p className={styles.errorMessage}>{errors.street.message}</p>}
          </div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type="text"
              placeholder="Number"
              defaultValue={restaurant && restaurant.address.number}
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
              defaultValue={restaurant && restaurant.address.zipcode}
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
            defaultValue={restaurant && restaurant.restaurantDescription}
            onBlur={(e) => setDescription(e.target.value)}
          />
        </div>
        <Button buttonStyle="signup" onClick={() => setCreateRestaurant(false)}>
          Cancel
        </Button>
        <input
          className={styles.submit}
          type="submit"
          value={`${!restaurant ? 'submit' : 'Update'}`}
        />
      </div>
    </form>
  );
};
