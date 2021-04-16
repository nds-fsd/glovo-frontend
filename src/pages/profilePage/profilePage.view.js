import React from 'react';
import NavbarG from '../../components/navbarG';
import styles from './profilePage.module.css';

export const ProfilePage = () => {
  return (
    <>
      <NavbarG />
      <p className={styles.container}>profile page</p>
    </>
  );
};
