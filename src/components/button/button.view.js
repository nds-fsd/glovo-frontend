import classnames from 'classnames';
import React from 'react';
import styles from './button.module.css';

export const Button = ({ onClick, buttonStyle, children }) => {
  const selectedStyle = classnames({
    [styles.signup]: buttonStyle === 'signup',
    [styles.login]: buttonStyle === 'login',
    [styles.signupAlt]: buttonStyle === 'signupAlt',
    [styles.edit]: buttonStyle === 'edit',
    [styles.cancel]: children === 'Cancel' && buttonStyle === 'edit',
  });
  return (
    <div className={`${styles.container} ${selectedStyle}`} onClick={() => onClick()}>
      <p style={{ background: 'none' }}>{children}</p>
    </div>
  );
};
