import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import SearchBox from '../searchBox';
import { debounce } from '../../assets/utils/debounce';
import { getUserToken } from '../../assets/utils/localStorage.utils';
import Button from '../button';
import { RestoListContext } from '../context/restoListPageContext';
import styles from './navbarG.module.css';

export const NavbarG = () => {
  const { setOpenLoginModal, setOpenSignupModal } = useContext(RestoListContext);
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
    <div className={classNames([styles.container], { [styles.onScroll]: !visible })}>
      <div>LOGO</div>
      <SearchBox />
      <div className={classNames([styles.buttons], { [styles.moving]: prevScrollPos > 350 })}>
        {getUserToken() ? (
          <>
            <FontAwesomeIcon
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
            <Button buttonStyle="login" onClick={() => setOpenLoginModal(true)}>
              Sign in
            </Button>
            <Button
              buttonStyle={`${!(prevScrollPos > 350) ? 'signup' : 'signupAlt'}`}
              onClick={() => setOpenSignupModal(true)}
            >
              Sign up
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
