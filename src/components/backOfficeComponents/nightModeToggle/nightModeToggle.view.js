/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nightModeToggle.module.css';

export const NightModeToggle = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const root = document.querySelector(':root');

    if (toggle) {
      root.style.setProperty('--salyWhite', '#2D2E30');
      root.style.setProperty('--salyGray', '#047CDC');
      root.style.setProperty('--lightSalyGray', '#494B45');
      return;
    }
    root.style.setProperty('--salyWhite', '#FFFFFF');
    root.style.setProperty('--saluGray', '#0f2d5273');
    root.style.setProperty('--lightSalyGray', '#F7F7F7');
  }, [toggle]);

  return (
    <div className={styles.toggle}>
      <p className={styles.toggleTitle}>
        Toggle Night Mode{' '}
        <FontAwesomeIcon
          icon="moon"
          style={{ color: `${toggle ? '#e6c60d' : 'var(--salyBlue)'}` }}
        />
      </p>
      <label className={styles.switch}>
        <input className={styles.input} type="checkbox" onChange={() => setToggle(!toggle)} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
