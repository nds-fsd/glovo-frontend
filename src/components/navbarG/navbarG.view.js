import React, { useContext } from 'react';
import Button from '../button';
import { RestoListContext } from '../context/restoListPageContext';
import styles from './navbarG.module.css';

export const NavbarG = () => {
  const { setOpenLoginModal } = useContext(RestoListContext);
  return (
    <div className={styles.container}>
      <div>LOGO</div>
      <div className={styles.buttons}>
        <Button buttonStyle="login" onClick={() => setOpenLoginModal(true)}>
          Sign in
        </Button>
        <Button buttonStyle="signup">Sign up</Button>
      </div>
    </div>
  );
};
