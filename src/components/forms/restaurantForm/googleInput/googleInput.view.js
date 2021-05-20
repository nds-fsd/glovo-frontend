/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import classNames from 'classnames';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import styles from './googleInput.module.css';

export const GoogleInput = ({ handleAddress, handleCoordinates }) => {
  const [address, setAddress] = useState('');

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    console.debug(results);
    const street = results[0].address_components.filter((item) => item.types[0] === 'route')[0]
      ?.long_name;
    const number = results[0].address_components.filter(
      (item) => item.types[0] === 'street_number'
    )[0]?.long_name;
    const zipcode = results[0].address_components.filter(
      (item) => item.types[0] === 'postal_code'
    )[0]?.long_name;

    console.debug(results);

    const latLng = await getLatLng(results[0]);

    console.debug(latLng);
    setAddress(value);
    handleAddress({ street, number, zipcode });
    handleCoordinates(latLng);
  };
  return (
    <PlacesAutocomplete
      debounce={500}
      value={address.fullAddress || address}
      onChange={setAddress}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={classNames([styles.inputContainer])}>
          <input
            className={styles.input}
            type="text"
            {...getInputProps({ placeholder: 'Full address' })}
          />
          <div>
            {loading && <p>...loading</p>}
            {suggestions.map((sugges) => {
              return (
                <div
                  className={classNames(styles.suggestion, {
                    [styles.open]: !loading,
                  })}
                  {...getSuggestionItemProps(sugges)}
                >
                  {sugges.description}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};
