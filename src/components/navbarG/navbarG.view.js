import React from 'react';
import Button from '../button';
import styles from './navbarG.module.css';

export const NavbarG = () => {
  return (
    <div className={styles.container}>
      <div>LOGO</div>
      <div className={styles.buttons}>
        <Button buttonStyle="login">Sign in</Button>
        <Button buttonStyle="signup">Sign up</Button>
      </div>
    </div>
  );
};
