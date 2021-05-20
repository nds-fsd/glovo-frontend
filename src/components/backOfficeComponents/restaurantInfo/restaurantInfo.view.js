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
import styles from './restaurantInfo.module.css';
import { STOP_CREATING } from '../../../pages/backOfficePage/backOfficeContext/types';
import GoogleInput from '../../forms/restaurantForm/googleInput';

export const RestaurantInfo = ({ restaurant }) => {
  return (
    <>
      <div className={styles.sectionA}>
        <div className={styles.inputContainerA}>
          <p className={styles.label}>Restaurant Name</p>
          {restaurant && restaurant.name}
        </div>
        <div className={styles.inputContainerA} style={{ width: '80%' }}>
          <p className={styles.label}>Full Address</p>
          GOOGLE FULL ADDRESS
        </div>
      </div>
      <div className={styles.sectionB}>
        <div className={styles.address}>
          <div className={styles.inputContainerC} style={{ width: '80%' }}>
            <p className={styles.label}>Street</p>

            {restaurant?.address?.street}
          </div>
          <div className={styles.inputContainerC}>
            <p className={styles.label}>Street Number</p>

            {restaurant?.address?.number}
          </div>
          <div className={styles.inputContainerC}>
            <p className={styles.label}>Zipcode</p>

            {restaurant?.address?.zipcode}
          </div>
        </div>
        <div className={styles.textArea}>
          <p className={styles.label}>Restaurant Description</p>
          {restaurant && restaurant.restaurantDescription}
        </div>
        <div className={styles.buttonContainer}></div>
      </div>
    </>
  );
};
