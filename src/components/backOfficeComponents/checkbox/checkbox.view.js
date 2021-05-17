/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './checkbox.module.css';

const Checkbox = ({ onChange, value, id, name, label }) => {
  return (
    <div className={styles.wrapper}>
      <p className={styles.radio}>
        <input type="radio" name={name} value={value} onChange={onChange} id={id} />
        <label htmlFor={id}>{label}</label>
      </p>
    </div>
  );
};

export default Checkbox;
