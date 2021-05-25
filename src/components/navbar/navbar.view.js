import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import SearchBox from '../searchBox';
import { debounce } from '../../assets/utils/debounce';
import { getUserToken } from '../../assets/utils/localStorage.utils';
import Button from '../button';
import styles from './navbar.module.css';

export const Navbar = ({ openLoginModal, openRegisterModal }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 50);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, handleScroll]);

  return (
    <div
      className={classNames(
        [styles.container],
        { [styles.onScroll]: !visible },
        { [styles.moving]: prevScrollPos > 350 }
      )}
    >
      <div>LOGO</div>
      <SearchBox />
      <div className={classNames([styles.buttons])}>
        {getUserToken() ? (
          <>
            <FontAwesomeIcon
              data-cy="user-circle"
              icon="user-circle"
              className={classNames([styles.icons], { [styles.movingIcons]: prevScrollPos > 350 })}
            />
            <FontAwesomeIcon
              icon="shopping-cart"
              className={classNames([styles.icons], { [styles.movingIcons]: prevScrollPos > 350 })}
            />
          </>
        ) : (
          <>
            <Button data-cy="login-button" buttonStyle="login" onClick={openLoginModal}>
              Sign in
            </Button>
            <Button buttonStyle="signup" onClick={openRegisterModal}>
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
