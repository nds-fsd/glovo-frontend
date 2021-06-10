/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import Button from '../../button';
import CategorySelect from '../../categorySelect';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import styles from './restaurantForm.module.css';
import { CHANGE_TAB, STOP_CREATING } from '../../../pages/backOfficePage/backOfficeContext/types';
import GoogleInput from './googleInput';
import { uploadImage } from '../../../assets/utils/imgUpload';
import { usePage } from '../../../hooks/usePage';
import { getUserSession } from '../../../assets/utils/localStorage.utils';

export const RestaurantForm = ({
  handleCategories,
  categories,
  restaurant,
  onUpdate,
  handleCoordinates,
}) => {
  const { image, setImage } = useBackOfficeContext();
  const { dispatch } = useBackOfficeContext();
  const { createOrEditElement: createOrEditRestaurant } = usePage('restaurant');
  const [description, setDescription] = useState(restaurant && restaurant.restaurantDescription);
  const [categoryError, setCategoryError] = useState(false);
  const [address, setAddress] = useState({ street: '', number: '', zipcode: '' });
  const [fullAddress, setFullAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (restaurant && setValue) {
      Object.keys(restaurant).forEach((key) => {
        if (key !== 'image') {
          if (key === 'address') {
            Object.keys(restaurant[key]).forEach((adKey) => {
              setValue(adKey, `${restaurant[key][adKey]}`);
            });
          }
          setValue(key, `${restaurant[key]}`);
        }
      });
    }
  }, [setValue, restaurant]);

  useEffect(() => {
    if (address && address.street && setValue) {
      Object.keys(address).forEach((key) => {
        setValue(key, `${address[key]}`);
      });
    }
  }, [address]);

  useEffect(() => {
    if (restaurant) {
      setImage(restaurant.image);
    }
  }, [restaurant]);

  const onSubmit = (data) => {
    let body;
    const userId = getUserSession().id;
    if (data && categories.length > 0) {
      const categoryIds = categories.map((category) => {
        return category._id;
      });

      body = {
        name: data.name,
        restaurantDescription: description,
        open: true,
        address: {
          number: data.number,
          street: data.street,
          zipcode: data.zipcode,
        },
        restaurantCategory: categoryIds,
        user: userId,
        image,
        coordinates,
        fullAddress,
      };
      if (!restaurant) {
        createOrEditRestaurant({
          body,
          onSuccess: () => {
            dispatch({ type: STOP_CREATING });
            dispatch({ type: CHANGE_TAB, payload: { name: 'Orders' } });
            dispatch({ type: CHANGE_TAB, payload: { name: 'Restaurants' } });
            setImage('');
          },
        });
        setImage('');
        return;
      }
      if (restaurant) {
        if (data && categories && categories.length > 0) {
          createOrEditRestaurant({
            id,
            body,
            onSuccess: () => dispatch({ type: STOP_CREATING }),
          });
          onUpdate();
          setImage('');
        }
      }
    }
  };
  useEffect(() => {
    if (categories && categories.length === 0) {
      setCategoryError(true);
      return;
    }
    setCategoryError(false);
  }, [categories]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.sectionA}>
        <div className={classNames([styles.inputContainerA], { [styles.onError]: errors.name })}>
          <p className={styles.label}>Restaurant Name</p>
          <input
            className={styles.input}
            type="text"
            placeholder="Name"
            defaultValue={restaurant && restaurant.name}
            {...register('name', { required: 'Restaurant name is required' })}
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        </div>
        <div style={{ width: '95%', position: 'relative' }}>
          {categoryError && <p className={styles.errorMessage}>Please choose at least one</p>}
          <p className={styles.label}>Category</p>
          <CategorySelect
            onChange={(e) => {
              handleCategories(e);
            }}
          />
        </div>
        <input
          className={styles.imageInput}
          id={restaurant ? 'file-input2' : 'file-input'}
          type="file"
          {...register('image')}
          onChange={(evt) => uploadImage(evt.target.files[0], setImage)}
        />
        <GoogleInput
          handleAddress={(value) => setAddress(value)}
          handleCoordinates={(value) => {
            setCoordinates(value);
            handleCoordinates(value);
          }}
          handleFullAddress={(value) => setFullAddress(value)}
          fullAddress={restaurant?.fullAddress || fullAddress}
        />
        <div className={styles.address}>
          <div
            className={classNames([styles.inputContainerC], {
              [styles.onError]: errors && errors.street,
            })}
            style={{ width: '95%' }}
          >
            <p className={styles.label}>Street Name</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Street"
              defaultValue={address.street ? address.street : restaurant?.address?.street}
              {...register('street', { required: 'Street name is required' })}
            />
            {errors.street && <p className={styles.errorMessage}>{errors.street.message}</p>}
          </div>
          <div
            className={classNames([styles.inputContainerC], { [styles.onError]: errors.number })}
          >
            <p className={styles.label}>Number</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Number"
              defaultValue={address.number ? address.number : restaurant?.address?.number}
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
            <p className={styles.label}>Zipcode</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Zipcode"
              defaultValue={address.zipcode ? address.zipcode : restaurant?.address?.zipcode}
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
        <p className={styles.descriptionLabel}>Restaurant Description</p>
        <textarea
          className={styles.textArea}
          placeholder="  Restaurant Description"
          defaultValue={restaurant && restaurant.restaurantDescription}
          onBlur={(e) => setDescription(e.target.value)}
        />
        <div className={styles.buttonContainer}>
          {!restaurant && (
            <Button
              buttonStyle="signup"
              onClick={() => {
                setImage('');
                dispatch({ type: STOP_CREATING });
              }}
            >
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
