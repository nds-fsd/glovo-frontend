import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import { roleContext } from '../../context/roleContext';

export const SideBar = () => {
  const {
    dispatch,
    state: { isNightMode },
  } = useBackOfficeContext();
  const { role } = useContext(roleContext);
  const history = useHistory();
  const handleLogOut = () => {
    removeSession();
    history.push('/');
    const root = document.querySelector(':root');
    root.style.setProperty('--salyWhite', '#FFFFFF');
    root.style.setProperty('--saluGray', '#0f2d5273');
    root.style.setProperty('--lightSalyGray', '#F7F7F7');
    root.style.setProperty('--salyBlack', '#111111');
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer} data-cy="globo-logo">
        <img
          className={styles.logo}
          src={`${isNightMode ? nightLogo : logo}`}
          onClick={() => history.push('/')}
          alt="logo"
        />
      </div>

      {role === 'SUPER_ADMIN' ? (
        <h4 className={styles.title}>Hello Admin</h4>
      ) : (
        <h4 className={styles.title}>MY RESTAURANT</h4>
      )}
      {role !== 'SUPER_ADMIN' && (
        <>
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
        </>
      )}
      {role === 'SUPER_ADMIN' && (
        <>
          <div
            className={styles.tab}
            onClick={() => dispatch({ type: CHANGE_TAB, payload: { name: 'Users' } })}
          >
            <User className={styles.icon} /> Users
          </div>
          <div
            className={styles.tab}
            onClick={() => dispatch({ type: CHANGE_TAB, payload: { name: 'Categories' } })}
          >
            <FontAwesomeIcon
              icon="layer-group"
              className={styles.icon}
              style={{ color: 'var(--salyBlue)' }}
            />{' '}
            Categories
          </div>
        </>
      )}
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
