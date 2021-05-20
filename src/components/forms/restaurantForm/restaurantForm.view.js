/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useRestaurants } from '../../../hooks/useRestaurants';
import Button from '../../button';
import CategorySelect from '../../categorySelect';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import styles from './restaurantForm.module.css';
import { STOP_CREATING } from '../../../pages/backOfficePage/backOfficeContext/types';
import GoogleInput from './googleInput';

export const RestaurantForm = ({
  handleCategories,
  categories,
  restaurant,
  onUpdate,
  handleCoordinates,
}) => {
  const { image, setImage } = useBackOfficeContext();
  const { dispatch } = useBackOfficeContext();
  const { createRestaurant, updateRestaurant } = useRestaurants();
  const [description, setDescription] = useState(restaurant && restaurant.restaurantDescription);
  const [categoryError, setCategoryError] = useState(false);
  const [address, setAddress] = useState({ street: '', number: '', zipcode: '' });
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const postDetails = (data) => {
    setImage(data);
    const formData = new FormData();
    formData.append('file', data);
    formData.append('upload_preset', 'globoApp');
    formData.append('cloud_name', 'partycloud');
    fetch('	https://api.cloudinary.com/v1_1/partycloud/image/upload', {
      method: 'post',
      body: formData,
    })
      .then((res) => res.json())
      .then((payload) => {
        console.log('image uploaded', payload);
        setImage(payload.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    if (!restaurant) {
      createRestaurant({
        categories,
        data,
        description,
        image,
        onSuccess: () => dispatch({ type: STOP_CREATING }),
      });
      return;
    }
    if (restaurant) {
      if (data && categories.length > 0) {
        updateRestaurant({
          data,
          categories,
          id,
          description,
          onSuccess: () => dispatch({ type: STOP_CREATING }),
        });
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      style={{ height: '100%', width: '100%' }}
    >
      <div className={styles.sectionA}>
        <div className={classNames([styles.inputContainerA], { [styles.onError]: errors.name })}>
          <input
            className={styles.input}
            type="text"
            placeholder="Name"
            defaultValue={restaurant && restaurant.name}
            {...register('name', { required: 'Restaurant name is required' })}
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        </div>
        <div style={{ width: '60%' }}>
          {categoryError && <p className={styles.errorMessage}>Please choose at least one</p>}
          <CategorySelect
            onChange={(e) => {
              handleCategories(e);
            }}
          />
        </div>
        <input
          className={styles.imageInput}
          id="file-input"
          type="file"
          {...register('image')}
          onChange={(evt) => postDetails(evt.target.files[0])}
        />
        <GoogleInput
          handleAddress={(value) => setAddress(value)}
          handleCoordinates={handleCoordinates}
        />
      </div>
      <div className={styles.sectionB}>
        <div className={styles.address}>
          <div
            className={classNames([styles.inputContainerC], { [styles.onError]: errors.street })}
            style={{ width: '80%' }}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Street"
              defaultValue={restaurant ? restaurant.address.street : address.street}
              {...register('street', { required: 'Street name is required' })}
            />
            {errors.street && <p className={styles.errorMessage}>{errors.street.message}</p>}
          </div>
          <div
            className={classNames([styles.inputContainerC], { [styles.onError]: errors.number })}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Number"
              defaultValue={restaurant ? restaurant.address.number : address.number}
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
          <div
            className={classNames([styles.inputContainerC], { [styles.onError]: errors.zipcode })}
          >
            <input
              className={styles.input}
              type="text"
              placeholder="Zipcode"
              defaultValue={restaurant ? restaurant.address.zipcode : address.zipcode}
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
        <textarea
          className={styles.textArea}
          placeholder="  Restaurant Description"
          defaultValue={restaurant && restaurant.restaurantDescription}
          onBlur={(e) => setDescription(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          {!restaurant && (
            <Button buttonStyle="signup" onClick={() => dispatch({ type: STOP_CREATING })}>
              Cancel
            </Button>
          )}
          <input
            className={styles.submit}
            type="submit"
            value={`${!restaurant ? 'submit' : 'Update'}`}
          />
        </div>
      </div>
    </form>
  );
};
