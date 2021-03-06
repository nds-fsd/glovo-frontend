import classnames from 'classnames';
import React from 'react';
import styles from './button.module.css';

export const Button = ({ onClick, buttonStyle, children, cy }) => {
  const selectedStyle = classnames({
    [styles.signup]: buttonStyle === 'signup',
    [styles.login]: buttonStyle === 'login',
    [styles.signupAlt]: buttonStyle === 'signupAlt',
    [styles._payOrder]: buttonStyle === 'payOrder',
    [styles.edit]: buttonStyle === 'edit',
    [styles.cancel]: children === 'Cancel' && buttonStyle === 'edit',
    [styles.delete]: buttonStyle === 'delete',
    [styles.menu]: buttonStyle === 'menu',
    [styles.primary]: buttonStyle === 'primary',
    [styles.primaryBig]: buttonStyle === 'primary big',
    [styles.viewAll]: buttonStyle === 'viewAll',
  });
  return (
    <div data-cy={cy} className={`${styles.container} ${selectedStyle}`} onClick={() => onClick()}>
      <p style={{ background: 'none' }}>{children}</p>
    </div>
  );
};
