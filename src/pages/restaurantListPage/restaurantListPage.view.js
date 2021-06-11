/* eslint-disable no-console */
import { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './restaurantListPage.module.css';
import CategoryBar from '../../components/categoryBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import Footer from '../../components/footer';
import { roleContext } from '../../components/context/roleContext';
import { RESTAURANT_CATEGORY } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';
import Header from '../../components/header';
import NavbarG from '../../components/navbar';
import LoginModal from '../../components/modal/loginModal';
import SignupModal from '../../components/modal/signupModal';

export const RestaurantListPage = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openCategoryBar, setOpenCategoryBar] = useState(false);

  const { categoryArr, setCategoryArr } = useContext(roleContext);

  useEffect(() => {
    shortFetch({ url: RESTAURANT_CATEGORY, method: 'get', onSuccess: setCategoryArr });
  }, []);
  const history = useHistory();
  const location = useLocation();

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
          <h1 data-cy="welcome-title" className={styles.title}>
            WHAT&apos;s ON THE MENU?
          </h1>
          <div className={styles.title}>
            <Button
              cy="category-button"
              buttonStyle="primary big"
              onClick={() => {
                setOpenCategoryBar(true);
              }}
            >
              Choose a Category
            </Button>
            {console.log(location.search)}
            {location.search.includes('name') && (
              <>
                <div className={styles.categoryName}>
                  {history.location.search.includes('name')
                    ? history.location.search.slice(6)
                    : history.location.search.slice(8)}
                </div>
              </>
            )}
          </div>
          <CategoryBar open={openCategoryBar} onClose={() => setOpenCategoryBar(false)}>
            {categoryArr}
          </CategoryBar>
          <RestaurantList />
        </div>
        <Footer />
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
