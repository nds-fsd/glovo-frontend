import React from 'react';
import styles from './inputText.module.css';

// This component recieves all the props from an input html tag, plus the message that will render
// in case of validation (used in Dish and restaurant form)

export const InputText = ({
  label,
  placeholder,
  value,
  handleChange,
  error,
  errorMessage,
  inputId,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor={inputId}>{label}</label>
      <br />
      {error && <legend className={styles.error_legend}>{errorMessage}</legend>}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        className={`${styles.input} ${error && styles.error}`}
        onChange={(e) => handleChange(e.target.value)}
        id={inputId}
      />
    </div>
  );
};
