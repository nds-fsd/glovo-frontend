import { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './restaurantListPage.module.css';
import CategoryBar from '../../components/categoryBar';
import Button from '../../components/button';
import RestaurantList from '../../components/restaurantList';
import { RestoListContext } from '../../components/context/restoListPageContext';
import { RESTAURANT_CATEGORY, RESTAURANT_LIST_PAGE } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';
import Header from '../../components/header';
import NavbarG from '../../components/navbarG';
import LoginModal from '../../components/modal/loginModal';
import SignupModal from '../../components/modal/signupModal';

export const RestaurantListPage = () => {
  const {
    categoryArr,
    setCategoryArr,
    openLoginModal,
    setOpenLoginModal,
    openSignupModal,
    setOpenSignupModal,
  } = useContext(RestoListContext);
  useEffect(() => {
    shortFetch({ url: RESTAURANT_CATEGORY, method: 'get', onSuccess: setCategoryArr });
  }, []);
  const history = useHistory();
  const location = useLocation();
  return (
    <>
      <div className={styles.pageContainer}>
        <Header>
          <NavbarG />
        </Header>
        <div className={styles.restaurantContainer}>
          <h1 className={styles.title}>WHAT&apos;s ON THE MENU?</h1>
          <div className={styles.title}>
            Choose a Category
            {location.search && (
              <Button buttonStyle="signup" onClick={() => history.push(RESTAURANT_LIST_PAGE)}>
                View All
              </Button>
            )}
          </div>
          <CategoryBar>{categoryArr}</CategoryBar>
          <RestaurantList />
        </div>
      </div>
      <LoginModal
        open={openLoginModal}
        onClose={() => {
          setOpenLoginModal(false);
        }}
      />
      <SignupModal
        open={openSignupModal}
        onClose={() => {
          setOpenSignupModal(false);
        }}
      />
    </>
  );
};
