/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../../assets/images/LogoBlack.png';
import nightLogo from '../../../assets/images/LogoWhite.png';
import { ReactComponent as Cutlery } from '../../../assets/icons/cutlery.svg';
import { ReactComponent as User } from '../../../assets/icons/User.svg';
import { ReactComponent as Shutdown } from '../../../assets/icons/Shutdown.svg';
import { ReactComponent as Orders } from '../../../assets/icons/toDoList.svg';
import styles from './sideBar.module.css';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { removeSession } from '../../../assets/utils/localStorage.utils';
import { CHANGE_TAB, VIEW_RESTAURANT } from '../../../pages/backOfficePage/backOfficeContext/types';
import { BACKOFFICE } from '../../../router/router';
import NightModeToggle from '../nightModeToggle';

export const SideBar = () => {
  const {
    dispatch,
    state: { isNightMode },
  } = useBackOfficeContext();
  const history = useHistory();
  const handleLogOut = () => {
    removeSession();
    history.push('/');
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={`${isNightMode ? nightLogo : logo}`}
          onClick={() => history.push('/')}
          alt="logo"
        />
      </div>

      <h4 className={styles.title}>MY RESTAURANT</h4>
      <div
        className={styles.tab}
        onClick={() => {
          history.push(BACKOFFICE);
          dispatch({ type: CHANGE_TAB, payload: { name: 'Restaurants' } });
          dispatch({ type: VIEW_RESTAURANT });
        }}
      >
        <Cutlery className={styles.icon} /> Restaurant
      </div>
      <div
        className={styles.tab}
        onClick={() => {
          dispatch({ type: CHANGE_TAB, payload: { name: 'Orders' } });
        }}
      >
        <Orders className={styles.icon} /> Orders
      </div>

      <h4 className={styles.title}>MY ACCOUNT</h4>
      <div
        className={styles.tab}
        onClick={() => dispatch({ type: CHANGE_TAB, payload: { name: 'User' } })}
      >
        <User className={styles.icon} /> User
      </div>
      <div
        className={styles.tab}
        onClick={() => {
          handleLogOut();
        }}
      >
        <Shutdown className={styles.icon} /> Log Out
      </div>
      <NightModeToggle />
    </div>
  );
};
