/* eslint-disable no-debugger */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useState, useContext } from 'react';
import { ShoppingOutlined, ProfileOutlined } from '@ant-design/icons';
import SearchBox from '../searchBox';
import ShoppingCartNav from './shoppingCartNav';
import { debounce } from '../../assets/utils/debounce';
import { getUserToken } from '../../assets/utils/localStorage.utils';
import Button from '../button';
import styles from './navbar.module.css';
import { BACKOFFICE, RESTAURANT_LIST_PAGE } from '../../router/router';
import { roleContext } from '../context/roleContext';
import ProfileInfo from './profileInfo';
import logoBalloon from '../../assets/images/letteringWhite.png';
import DropDown from '../modal/dropdown';
import DeliveryInformation from '../deliveryInformation';
import shoppingCartBlue from '../../assets/images/shoppingCart_blue.png';
import shoppingCartWhite from '../../assets/images/shoppingCart_white.png';
import briefcaseWhite from '../../assets/images/briefcase_white.png';
import briefcaseBlue from '../../assets/images/briefcase_blue.png';

export const Navbar = ({ openLoginModal, openRegisterModal, isRestoViewPage }) => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { role, setProfileDropOpen, profileDropOpen } = useContext(roleContext);
  const [openShopCart, setopenShopCart] = useState(false);
  const { id } = useParams();
  const history = useHistory();

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
        { [styles.moving]: prevScrollPos > 350 },
        { [styles._viewPage]: isRestoViewPage }
      )}
    >
      <div className={styles._logoContainer}>
        <Link to={RESTAURANT_LIST_PAGE}>
          <img src={logoBalloon} alt="logo" className={styles._hotAirBalloon} />
        </Link>
      </div>
      {}
      <SearchBox />
      <div className={classNames([styles.buttons])}>
        {getUserToken() ? (
          <>
          <div style={{ position: 'relative' }}>
            {role === 'PROVIDER' || role === 'SUPER_ADMIN' ? (
                <ProfileOutlined
                className={classNames([styles.icons], {
                  [styles.movingIcons]: prevScrollPos > 350,
                })}
                onClick={() => history.push(BACKOFFICE)}
              />
            ): (<FontAwesomeIcon
                icon="user-circle"
                className={classNames([styles.icons], {
                  [styles.movingIcons]: prevScrollPos > 350,
                })}
                onClick={() => setProfileDropOpen(!profileDropOpen)}
              />)}
              {profileDropOpen && (
                  <DropDown open={profileDropOpen} onClose={() => setProfileDropOpen(false)}>
                    <ProfileInfo onClose={() => setProfileDropOpen(false)} />
                  </DropDown>
                )}
                {openShopCart && (
                  <DropDown open={openShopCart} onClose={() => setopenShopCart(false)}>
                    <DeliveryInformation showIcons={false} />
                  </DropDown>
                )}
          </div>
            {!id && (
              <div
                style={{ position: 'relative' }}
                onClick={() => {
                  setopenShopCart(!openShopCart);
                }}
              >
                <ShoppingOutlined
                  className={classNames([styles.icons], {
                    [styles.movingIcons]: prevScrollPos > 350,
                  })}
                />
              </div>
            )}
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
