import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import styles from './restaurantViewPage.module.css';
import DishItem from '../../components/dishItem';
import { ALL_COURSES, RESTAURANT } from '../../router/router';
import DeliveryInformation from '../../components/deliveryInformation';
import Modal from '../../components/modal';
import Button from '../../components/button';
import { useCartContext } from '../../context/cartContext';
import { Navbar } from '../../components/navbar/navbar.view';
import background from '../../assets/images/header-test.png';
import SignupModal from '../../components/modal/signupModal';
import LoginModal from '../../components/modal/loginModal';
import restExample from '../../assets/images/restExample.jpg';

export const RestaurantViewPage = () => {
  const { id } = useParams();
  const [selectedResto, setSelectedResto] = useState();
  const [dishByCourse, setDishByCourse] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { addToCart, modalDishView } = useCartContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRestoViewPage, setIsRestoViewPage] = useState(true);
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    shortFetch({
      url: `${RESTAURANT}/${id}`,
      method: 'GET',
      onSuccess: setSelectedResto,
    });
  }, []);

  const handleClick = (courseId) => {
    document.getElementById(courseId).scrollIntoView({ behavior: 'smooth' });
    setSelectedCategory(courseId);
  };
  useEffect(() => {
    shortFetch({
      url: `${ALL_COURSES}/${id}`,
      method: 'GET',
      onSuccess: setDishByCourse,
    });
  }, []);

  return (
    <div>
      <Navbar
        openLoginModal={() => setOpenLoginModal(true)}
        openRegisterModal={() => setOpenSignupModal(true)}
        isRestoViewPage={isRestoViewPage}
      />
      <header
        className={styles._header}
        style={{ backgroundImage: `url(${selectedResto?.image || background})` }}
      ></header>
      <div className={styles._allContainter}>
        <div className={styles._restoCard}>
          <div className={styles._restoCardContainer}>
            {selectedResto && (
              <div className={styles._restoInfo}>
                <div className={styles._restoCategory}>
                  Category {'>'}{' '}
                  {selectedResto &&
                    selectedResto.restaurantCategory.map((cat) => {
                      return <span>{cat.name} </span>;
                    })}
                </div>
                <h1 className={styles._restoTitle}>{selectedResto.name}</h1>
                <p style={{ fontStyle: 'italic', margin: '0' }}>
                  {selectedResto.restaurantDescription}
                </p>
              </div>
            )}
            {isOpenModal && (
              <Modal onClose={() => setIsOpenModal(false)} open={isOpenModal}>
                <h2 style={{ fontWeight: 'bold' }}>{capitalize(modalDishView?.dish)}</h2>
                <div className={styles.modalContainer}>
                  <div className={styles.column1}>
                    <div className={styles.imageContainer}>
                      <img
                        className={styles.image}
                        src={modalDishView?.img || restExample}
                        alt="food"
                      />
                    </div>
                  </div>
                  <div className={styles.column2}>
                    {' '}
                    <div className={styles.description}>
                      {capitalize(modalDishView?.description)}
                    </div>
                    <div className={styles.price}>{formatNumber(modalDishView?.price)}</div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    addToCart({
                      dish: modalDishView.dish,
                      price: modalDishView.price,
                      id: modalDishView.id,
                      restoId: modalDishView.restoId,
                    });
                    setIsOpenModal(false);
                  }}
                  buttonStyle="payOrder"
                >
                  Add to Order
                </Button>
              </Modal>
            )}
            <div className={styles._courseContainer}>
              <div className={styles._viewCourses}>
                {dishByCourse &&
                  dishByCourse.slice(0, 3).map((course) => {
                    return (
                      <div className={styles._coursesBar}>
                        <p
                          className={classNames({
                            [styles._underline]: selectedCategory === course._id,
                          })}
                          key={course._id}
                          onClick={() => handleClick(course._id)}
                          style={{ marginRight: '20px' }}
                        >
                          {capitalize(course.name)}
                        </p>
                      </div>
                    );
                  })}
              </div>
              {dishByCourse?.length > 3 && (
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                  <DropdownToggle
                    caret
                    tag="span"
                    data-toggle="dropdown"
                    aria-expanded={dropdownOpen}
                    className={styles._dropToggle}
                  >
                    <FontAwesomeIcon icon="ellipsis-h" className={styles._iconEllipsis} />
                  </DropdownToggle>
                  <DropdownMenu right>
                    <div className={styles._moreCourses}>
                      {dropdownOpen &&
                        dishByCourse &&
                        dishByCourse.slice(3).map((course) => {
                          return (
                            <DropdownItem text className={styles._dropItem}>
                              <div>
                                <p key={course._id} onClick={() => handleClick(course._id)}>
                                  {capitalize(course.name)}
                                </p>
                              </div>
                            </DropdownItem>
                          );
                        })}
                    </div>
                  </DropdownMenu>
                </Dropdown>
              )}
            </div>
          </div>
          <div className={styles._allDishes}>
            {dishByCourse &&
              dishByCourse.map((course) => {
                return (
                  <div>
                    <h2 id={course._id}>{capitalize(course.name)}</h2>
                    <div className={styles._courseAndDish}>
                      {course.dishList.map((dish) => {
                        return (
                          <div className={styles._dishSectionContainer}>
                            <DishItem
                              selectedDish={dish}
                              openModal={() => {
                                setIsOpenModal(true);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className={styles._infoGlovo}>
          <DeliveryInformation
            selectedResto={selectedResto}
            showIcons
            openRegisterModal={() => setOpenSignupModal(true)}
          />
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
    </div>
  );
};
