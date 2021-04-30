import React from 'react';
import styles from './header.module.css';

export const Header = ({ children }) => {
	return <div className={styles.header}>{children}</div>;
};
