/* eslint-disable no-console */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState, useContext } from 'react';
import SearchBox from '../searchBox';
import { debounce } from '../../assets/utils/debounce';
import { getUserToken } from '../../assets/utils/localStorage.utils';
import Button from '../button';
import styles from './navbar.module.css';
import { BACKOFFICE } from '../../router/router';
import { roleContext } from '../context/roleContext';
import ProfileInfo from './profileInfo';

export const Navbar = ({ openLoginModal, openRegisterModal }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { role, setProfileDropOpen, profileDropOpen, setEditingProfile } = useContext(roleContext);

  const handleScroll = debounce(() => {
    const currentScrollPos = window.pageYOffset;

    setVisible(
      (prevScrollPos > currentScrollPos && prevScrollPos - currentScrollPos > 70) ||
        currentScrollPos < 10
    );

    setPrevScrollPos(currentScrollPos);
  }, 50);

  useEffect(() => {
    if (!profileDropOpen) setEditingProfile(false);
  }, [profileDropOpen]);

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
      {}
      <SearchBox />
      <div className={classNames([styles.buttons])}>
        {getUserToken() ? (
          <>
            {role === 'PROVIDER' ? (
              <Link to={BACKOFFICE}>
                <FontAwesomeIcon
                  icon="briefcase"
                  className={classNames([styles.icons], {
                    [styles.movingIcons]: prevScrollPos > 350,
                  })}
                />
              </Link>
            ) : (
              <>
                <FontAwesomeIcon
                  icon="user-circle"
                  className={classNames([styles.icons], {
                    [styles.movingIcons]: prevScrollPos > 350,
                  })}
                  onClick={() => setProfileDropOpen(!profileDropOpen)}
                />
                {profileDropOpen && <ProfileInfo />}
              </>
            )}
            <FontAwesomeIcon
              icon="shopping-cart"
              className={classNames([styles.icons], { [styles.movingIcons]: prevScrollPos > 350 })}
            />
          </>
        ) : (
          <>
            <Button buttonStyle="login" onClick={openLoginModal}>
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
