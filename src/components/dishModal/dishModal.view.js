/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import styles from './dishModal.module.css';
import Modal from '../modal';
import { BACKEND } from '../../router/router';

export const DishModal = ({ onClose, open, selectedDish }) => {
  const [newName, setNewName] = useState();
  const [newPrice, setNewPrice] = useState();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = (data) => {
    setNewName(data.name);
    setNewPrice(data.price);

    const body = {
      name: newName,
      price: newPrice,
    };
    const options = {
      method: 'PATCH',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };
    fetch(`${BACKEND}/dish/${selectedDish.id}`, options)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((dishes) => {
        console.log(dishes);
      })
      .catch((err) => {
        return console.log(err);
      });

    onClose();
  };

  return (
    <Modal onClose={onClose} open={open} title="Restaurant Update Form" selectedDish={selectedDish}>
      <div className={styles._container}>
        <form onSubmit={handleSubmit(submit)} className={styles._formContainer}>
          <label htmlFor="name">Name</label>
          {errors && errors.name && <span>This field is required</span>}
          <input
            {...register('name', {
              required: true,
            })}
            id="name"
          />
          {/* <label htmlFor="description">Description</label>
          {errors && errors.description && <span>The description is too short</span>}
          <input
            {...register('description', {
              required: true,
              minLength: 10,
            })}
            id="description"
          /> */}
          <label htmlFor="price">Price</label>
          {errors && errors.price && <span>{errors.price.message}</span>}
          {errors && errors.price && <span>This field is required</span>}
          <input
            type="text"
            {...register('price', {
              required: true,
              pattern: { value: /^-?\d+\.?\d*$/, message: 'Only numbers' },
            })}
            id="price"
          />
          <input type="submit" />
        </form>
      </div>
    </Modal>
  );
};
