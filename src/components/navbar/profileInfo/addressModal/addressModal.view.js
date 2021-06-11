/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-undef */

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './addressModal.module.css';
import NavbarModal from '../../navbarModal';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { USER } from '../../../../router/router';
import { getUserSession } from '../../../../assets/utils/localStorage.utils';
import GoogleInput from '../../../forms/restaurantForm/googleInput';
import { ReactComponent as Gmaps } from '../../../../assets/icons/Google_Maps_Logo_2020.svg';

export const AddressModal = ({ onClose, open, userDetails }) => {
  const [fullAddress, setFullAddress] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [address, setAddress] = useState({ street: '', number: '', zipcode: '' });
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    if (userDetails.address && userDetails.address.street && setValue) {
      Object.keys(userDetails.address).forEach((key) => {
        setValue(key, `${userDetails.address[key]}`);
      });
    }
    if (address && address.street && setValue) {
      Object.keys(address).forEach((key) => {
        setValue(key, `${address[key]}`);
      });
    }
  }, [address, userDetails.address]);

  const onSubmit = (data) => {
    shortFetch({
      url: `${USER}/${userDetails._id}`,
      method: 'PATCH',
      body: {
        address: {
          number: data.number,
          street: data.street,
          zipcode: data.zipcode,
        },
        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        fullAddress,
      },
      token: true,

      onSuccess: (res) => {
        console.log(res);
        onClose();
      },
      onError: (err) => {
        console.log(err, 'WHAT YOU DOIN BRO!!!');
      },
    });
  };

  const initMap = (lat, lng) => {
    const center = { lat: parseFloat(lat), lng: parseFloat(lng) };

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
    if (userDetails.coordinates) {
      initMap(userDetails.coordinates.lat, userDetails.coordinates.lng);
    }
    if (coordinates.lat && coordinates.lng) {
      initMap(coordinates.lat, coordinates.lng);
    }
  }, [userDetails.coordinates, coordinates]);
  return (
    <NavbarModal onClose={onClose} open={open} modalStyle="address">
      {console.log(userDetails)}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.container}>
          <div className={styles.title}>
            <span className={styles.textTitle}>Tu Dirección</span>
          </div>
          <div className={styles.mapInputs}>
            <div className={styles.inputText}>
              <GoogleInput
                style={{ marginBottom: '100px' }}
                handleAddress={(value) => setAddress(value)}
                handleCoordinates={(value) => {
                  setCoordinates(value);
                }}
                handleFullAddress={(value) => setFullAddress(value)}
                fullAddress={userDetails?.fullAddress || fullAddress}
              />
              {console.log(typeof GoogleInput)}
              <div
                className={classNames([styles.inputContainerC], {
                  [styles.onError]: errors && errors.street,
                })}
                style={{ width: '80%' }}
              >
                <p className={classNames([styles.label])}>Street Name</p>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Street"
                  value={address.street ? address.street : userDetails.fullAddress?.address?.street}
                  {...register('street', { required: 'Street name is required' })}
                />
                {errors.street && <p className={styles.errorMessage}>{errors.street.message}</p>}
              </div>
              <div
                className={classNames([styles.inputContainerC], {
                  [styles.onError]: errors.number,
                })}
              >
                <p className={styles.label}>Number</p>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Number"
                  value={address.number ? address.number : userDetails.fullAddress?.address?.number}
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
                className={classNames([styles.inputContainerC], {
                  [styles.onError]: errors.zipcode,
                })}
              >
                <p className={styles.label}>Zipcode</p>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Zipcode"
                  value={
                    address.zipcode ? address.zipcode : userDetails?.fullAddress?.address?.zipcode
                  }
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

            <div id="map" className={styles.map}>
              <Gmaps className={styles.icon} />
            </div>
          </div>
          <div className={styles.submitButton}>
            {coordinates.lat ? (
              <input className={styles.submit} type="submit" value="Submit" />
            ) : (
              <p onClick={() => onClose()} className={styles.submitCancel}>
                Cancel
              </p>
            )}
          </div>
        </div>
      </form>
    </NavbarModal>
  );
};
