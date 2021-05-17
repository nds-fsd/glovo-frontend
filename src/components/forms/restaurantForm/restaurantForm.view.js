/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useRestaurants } from '../../../hooks/useRestaurants';
import Button from '../../button';
import CategorySelect from '../../categorySelect';
import { backOfficeContext } from '../../context/backOfficeContext';
import styles from './restaurantForm.module.css';

/**
 * @param handleCategories  to save, edit or delete the array of categories
 * @param  categories array of objects {name, _id } of the categories
 */
export const RestaurantForm = ({ handleCategories, categories, restaurant, onUpdate }) => {
  const { setCreateRestaurant, image, setImage } = useContext(backOfficeContext);
  const { createRestaurant, updateRestaurant } = useRestaurants();
  const [description, setDescription] = useState(restaurant && restaurant.restaurantDescription);
  const [categoryError, setCategoryError] = useState(false);
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
      createRestaurant({ categories, data, description, setCreateRestaurant, image });
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
          {console.log(image)}
        </div>
        <div className={styles.imgUpload}>
          <input
            className={styles.input}
            type="file"
            {...register('image')}
            onChange={(evt) => postDetails(evt.target.files[0])}
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
        {!restaurant && (
          <Button buttonStyle="signup" onClick={() => setCreateRestaurant(false)}>
            Cancel
          </Button>
        )}
        <input
          className={styles.submit}
          type="submit"
          value={`${!restaurant ? 'submit' : 'Update'}`}
        />
      </div>
    </form>
  );
};
