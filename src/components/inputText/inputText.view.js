/* eslint-disable no-console */
import React, { useState } from 'react';
import styles from './inputText.module.css';

// This component recieves all the props from an input html tag, plus the message that will render
// in case of validation (used in Dish and restaurant form)

export const InputText = ({
  label,
  placeholder,
  value,
  handleChange,
  inputId,
  validations,
  onError,
}) => {
  const [errorList, setErrorList] = useState([]);
  const validationFunc = (inputValue) => {
    if (validations) {
      return validations.map((validation) => {
        return { isError: !validation.func(inputValue), message: validation.message };
      });
    }
    return undefined;
  };
  return (
    <div className={styles.container}>
      <label htmlFor={inputId}>{label}</label>
      <br />
      {}
      {errorList &&
        errorList.map((errorInfo) => (
          <legend className={styles.error_legend}>{errorInfo.message}</legend>
        ))}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={`${styles.input} ${errorList && styles.error}`}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
        onBlur={(e) => {
          const validationResult = validationFunc(e.target.value);
          const errors = validationResult.filter((result) => result.isError);
          console.debug(errors);
          if (errors.length > 0) {
            setErrorList(errors);
            if (onError) onError(true);
          } else {
            setErrorList([]);
            onError(false);
          }
        }}
        id={inputId}
      />
    </div>
  );
};
