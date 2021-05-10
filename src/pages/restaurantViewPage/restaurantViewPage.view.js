/* eslint-disable no-undef */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import styles from './restaurantViewPage.module.css';
import DishItem from '../../components/dishItem';
import { ALL_COURSES, RESTAURANT } from '../../router/router';
import DeliveryInformation from '../../components/deliveryInformation/deliveryInformation.view';
import Modal from '../../components/modal';
import Button from '../../components/button';

export const RestaurantViewPage = () => {
  const [completedCart, setCompletedCart] = useState([]);
  const { id } = useParams();
  const [selectedResto, setSelectedResto] = useState();
  const [dishByCourse, setDishByCourse] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalDishView, setModalDishView] = useState({});
  const [seeMoreCategories, setSeeMoreCategories] = useState(false);

  useEffect(() => {
    shortFetch({
      url: `${RESTAURANT}/${id}`,
      token: true,
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
      token: true,
      method: 'GET',
      onSuccess: setDishByCourse,
    });
  }, []);
 
  const addToCart = (dish) => {
    const check = completedCart.filter((dishCart) => {
      return dishCart.id === dish.id;
    });
    if (check.length === 0) {
      setCompletedCart([...completedCart, dish]);
      return;
    }
    if (check.length > 0) {
      const newCheck = completedCart.filter((cartDish) => {
        return cartDish.id !== dish.id;
      });
      setCompletedCart([...newCheck, dish]);
    }
  };

  const viewDishInModal = (dish) => {
    if (dish) {
      setModalDishView({ ...dish, modalDishView });
    }
  };

  const onClick = () => {
    console.log('hola');
  };

  return (
    <div>
      <header className={styles._header}></header>
      <div className={styles._allContainter}>
        <div className={styles._restoCard}>
          <div className={styles._restoCardContainer}>
            {selectedResto && (
              <div className={styles._restoInfo}>
                Category {'>'}{' '}
                {selectedResto &&
                  selectedResto.restaurantCategory.map((cat) => {
                    return <span>{cat.name}</span>;
                  })}
                <h1>{selectedResto.name}</h1>
                <p style={{ fontStyle: 'italic' }}>{selectedResto.restaurantDescription}</p>
              </div>
            )}
            {isOpenModal && (
              <Modal onClose={() => setIsOpenModal(false)} open={isOpenModal}>
                <h2 style={{ fontWeight: 'bold' }}>
                  {modalDishView && capitalize(modalDishView.dish)}
                </h2>
                <p>{modalDishView && formatNumber(modalDishView.price)}</p>
                <Button onClick={() => onClick()} buttonStyle="payOrder">
                  Add to Order
                </Button>
              </Modal>
            )}
            <div className={styles._courseContainer}>
              {dishByCourse &&
                dishByCourse.slice(0, 1).map((course, i) => {
                  return (
                    <div>
                      <div className={styles._coursesBar}>
                        <p
                          className={classNames({
                            [styles._underline]: selectedCategory === course._id,
                          })}
                          key={course._id}
                          onClick={() => handleClick(course._id)}
                        >
                          {capitalize(course.name)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              <FontAwesomeIcon
                icon="ellipsis-h"
                className={styles._iconEllipsis}
                onClick={() => {
                  setSeeMoreCategories(!seeMoreCategories);
                }}
              />

              <div className={styles._coursesBarContainer}>
                {seeMoreCategories &&
                  dishByCourse &&
                  dishByCourse.map((course, i) => {
                    return (
                      <div>
                        <p key={course._id} onClick={() => handleClick(course._id)}>
                          {capitalize(course.name)}
                        </p>
                      </div>
                    );
                  })}
              </div>
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
                              addToCart={(plate) => addToCart(plate)}
                              viewDishInModal={(modalDish) => viewDishInModal(modalDish)}
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
          <DeliveryInformation completedCart={completedCart} />
        </div>
      </div>
    </div>
  );
};
