/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './addressModal.module.css';
import Modal from '../../../modal';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { USER } from '../../../../router/router';
import { getUserSession } from '../../../../assets/utils/localStorage.utils';
import GoogleInput from '../../../forms/restaurantForm/googleInput';
import { ReactComponent as Gmaps } from '../../../../assets/icons/Google_Maps_Logo_2020.svg';

export const AddressModal = ({ onClose, open, userDetailsFullAddress }) => {
  const [fullAddress, setFullAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState({ street: '', number: '', zipcode: '' });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    shortFetch({
      url: `${USER}/${getUserSession().id}}`,
      method: 'PATCH',
      body: {
        address: {
          number: data.number,
          street: data.street,
          zipcode: data.zipcode,
        },
        coordinates: {
          lat: coordinates.lat,
          leng: coordinates.leng,
        },
        fullAddress,
      },
      token: true,
      
      onSuccess: (res) => {
        console.log(res);
      },
    });
  };

  const initMap = () => {
    const center = { lat: parseFloat(coordinates.lat), lng: parseFloat(coordinates.lng) };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center,
    });
    const marker = new google.maps.Marker({
      position: center,
      map,
    });
  };

  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      initMap();
    }
  }, [coordinates]);
  return (
    <Modal title="Tu dirección" onClose={onClose} open={open}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <GoogleInput
          handleAddress={(value) => setAddress(value)}
          handleCoordinates={(value) => {
            setCoordinates(value);
          }}
          handleFullAddress={(value) => setFullAddress(value)}
          fullAddress={fullAddress || userDetailsFullAddress}
        />
        <div className={styles.address}>
          <div
            className={classNames([styles.inputContainerC], {
              [styles.onError]: errors && errors.street,
            })}
            style={{ width: '80%' }}
          >
            <p className={classNames([styles.inputContainerC])}>Street Name</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Street"
              value={address.street ? address.street : userDetailsFullAddress?.address?.street}
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
              value={address.number ? address.number : userDetailsFullAddress?.address?.number}
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
              value={address.zipcode ? address.zipcode : userDetailsFullAddress?.address?.zipcode}
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
        <input className={styles.submit} type="submit" value="submit" />
      </form>
      <div id="map" className={styles.map}>
        <Gmaps className={styles.icon} />
      </div>
    </Modal>
  );
};
