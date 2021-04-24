import classnames from 'classnames';
import React from 'react';
import styles from './button.module.css';

export const Button = ({ onClick, buttonStyle, children }) => {
  const selectedStyle = classnames({
    [styles.signup]: buttonStyle === 'signup',
    [styles.login]: buttonStyle === 'login',
  });
  return (
    <div className={`${styles.container} ${selectedStyle}`} onClick={() => onClick()}>
      <p className={styles._buttonText}>{children}</p>
    </div>
  );
};
