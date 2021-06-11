/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './nightModeToggle.module.css';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { TOGGLE_NIGHT_MODE } from '../../../pages/backOfficePage/backOfficeContext/types';
import { setStorageObject } from '../../../assets/utils/localStorage.utils';

export const NightModeToggle = () => {
  const {
    dispatch,
    state: { isNightMode },
  } = useBackOfficeContext();

  useEffect(() => {
    if (isNightMode === null || isNightMode === undefined) {
      setStorageObject('nightMode', false);
      return;
    }
    setStorageObject('nightMode', isNightMode);
  }, [isNightMode]);

  useEffect(() => {
    const root = document.querySelector(':root');
    if (isNightMode === true) {
      root.style.setProperty('--salyWhite', '#2D2E30');
      root.style.setProperty('--salyGray', '#047CDC');
      root.style.setProperty('--lightSalyGray', '#494B45');
      root.style.setProperty('--salyBlack', '#979797');
      return;
    }
    root.style.setProperty('--salyWhite', '#FFFFFF');
    root.style.setProperty('--saluGray', '#0f2d5273');
    root.style.setProperty('--lightSalyGray', '#F7F7F7');
    root.style.setProperty('--salyBlack', '#111111');
  }, [isNightMode]);

  return (
    <div className={styles.toggle} data-cy="night-mode">
      <p className={styles.toggleTitle}>
        Toggle Night Mode{' '}
        <FontAwesomeIcon
          icon="moon"
          style={{ color: `${isNightMode ? '#e6c60d' : 'var(--salyBlue)'}` }}
        />
      </p>
      <label className={styles.switch}>
        <input
          checked={isNightMode}
          className={styles.input}
          type="checkbox"
          onChange={() => dispatch({ type: TOGGLE_NIGHT_MODE })}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
