/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React from 'react';
import { useForm } from 'react-hook-form';
import CategorySelect from '../../components/categorySelect';
import NavbarG from '../../components/navbarG';
import styles from './profilePage.module.css';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNzlhMDBlZTkyMzJkNWYxOWEzZTMzYyIsImlhdCI6MTYxODU4MzU2NywiZXhwIjozMjQyMzUxMTM0fQ.D-S8wKes5UB9XT9VN8ZDEkVgVDed1FyoNwoYIJZEIPg';

export const ProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.debug(data.street);
  };

  console.debug(errors);
  return (
    <>
      <NavbarG />
      <p className={styles.container}>profile page</p>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.name && <p>{errors.name.message}</p>}
          <input
            type="text"
            placeholder="Restaurant Name"
            {...register('name', { required: 'This field is required' })}
          />
          {errors.restaurantCategory && <p>{errors.restaurantCategory.message}</p>}
          <CategorySelect
            {...register('restaurantCategory', { required: 'Please choose one category' })}
          />
          <textarea
            placeholder="Please add your description"
            {...register('restaurantDescription')}
          ></textarea>
          {errors.street && <p>{errors.street.message}</p>}
          <input
            type="text"
            placeholder="street"
            {...register('street', { required: 'Street name is required' })}
          />
          {errors.number && <p>{errors.number.message}</p>}
          <input
            type="text"
            placeholder="number"
            {...register('number', {
              required: 'Street number is required',
              pattern: {
                value: /^-?\d+\.?\d*$/,
                message: 'please enter a valid number',
              },
            })}
          />
          {errors.zipcode && <p>{errors.zipcode.message}</p>}
          <input
            type="text"
            placeholder="zipcode"
            {...register('zipcode', {
              required: 'zipcode number is required',
              pattern: {
                value: /^\d{5}$/,
                message: 'zipcode must be 5 digits',
              },
            })}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
};
