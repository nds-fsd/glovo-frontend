import React from 'react';
import styles from './header.module.css';

export const Header = ({ children }) => {
  return (
    <div data-cy="main-header" className={styles.header}>
      {children}
    </div>
  );
};
