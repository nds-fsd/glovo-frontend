/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './restaurantListPage.module.css';
import CategoryBar from '../../components/categoryBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import { RestoListContext } from '../../components/context/restoListPageContext';
import { RESTAURANT_CREATION_PAGE, RESTAURANT_CATEGORY } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';
import Header from '../../components/header';
import NavbarG from '../../components/navbar';
import LoginModal from '../../components/modal/loginModal';
import SignupModal from '../../components/modal/signupModal';

export const RestaurantListPage = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const { categoryArr, setCategoryArr, setCategorySelected, categorySelected } = useContext(
    RestoListContext
  );
  useEffect(() => {
    shortFetch({ url: RESTAURANT_CATEGORY, method: 'get', onSuccess: setCategoryArr });
  }, []);

  return (
    <>
      <div className={styles.pageContainer}>
        <Header>
          <NavbarG
            openLoginModal={() => setOpenLoginModal(true)}
            openRegisterModal={() => setOpenSignupModal(true)}
          />
        </Header>
        <div className={styles.restaurantContainer}>
          <h1 className={styles.title}>WHAT&apos;s ON THE MENU?</h1>
          <p className={styles.title}>
            Choose a Category
            {categorySelected && (
              <Button buttonStyle="signup" onClick={() => setCategorySelected('')}>
                View All
              </Button>
            )}
          </p>
          <CategoryBar>{categoryArr}</CategoryBar>
          <Link to={`${RESTAURANT_CREATION_PAGE}`}>
            <Button buttonText="Create" />
          </Link>
          <RestaurantList />
        </div>
      </div>
      <LoginModal
        open={openLoginModal}
        openRegister={() => {
          setOpenSignupModal(true);
          setOpenLoginModal(false);
        }}
        onClose={() => {
          setOpenLoginModal(false);
        }}
      />
      <SignupModal
        open={openSignupModal}
        openLogin={() => {
          setOpenSignupModal(false);
          setOpenLoginModal(true);
        }}
        onClose={() => {
          setOpenSignupModal(false);
        }}
      />
    </>
  );
};
