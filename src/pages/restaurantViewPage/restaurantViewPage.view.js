/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { shortFetch } from '../../assets/utils/fetch.utils';
import styles from './restaurantViewPage.module.css';
import Modal from '../../components/modal';
import DishItem from '../../components/dishItem';
import RestaurantUpdateForm from '../../components/forms/restaurantUpdateForm';
import { ALL_COURSES, RESTAURANT } from '../../router/router';
import DeliveryInformation from '../../components/deliveryInformation/deliveryInformation.view';

export const RestaurantViewPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { id } = useParams();
  const [selectedResto, setSelectedResto] = useState();
  const [dishByCourse, setDishByCourse] = useState();
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    shortFetch({ url: `${RESTAURANT}/${id}`, method: 'GET', onSuccess: setSelectedResto });
  }, [isOpenModal]);

  const handleClick = (courseId) => {
    document.getElementById(courseId).scrollIntoView({ behavior: 'smooth' });
    setSelectedCategory(courseId);
  };
  useEffect(() => {
    shortFetch({ url: `${ALL_COURSES}/${id}`, method: 'GET', onSuccess: setDishByCourse });
  }, []);

  const capitalize = (name) => {
    if (typeof name !== 'string') return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <div>
      <header className={styles._header}></header>
      <div className={styles._allContainter}>
        <div className={styles._restoCard}>
          <div className={styles._restoCardContainer}>
            {selectedResto && (
              <div className={styles._restoInfo}>
                <p>
                  Category {'>'} {selectedResto.restaurantCategory.name}
                </p>
                <h1>{selectedResto.name}</h1>
                <p style={{ fontStyle: 'italic' }}>{selectedResto.restaurantDescription}</p>
                <button onClick={() => setIsOpenModal(true)}>Edit</button>
              </div>
            )}
            {isOpenModal && (
              <Modal
                onClose={() => setIsOpenModal(false)}
                open={isOpenModal}
                title="Modify your data"
              >
                <RestaurantUpdateForm onClose={() => setIsOpenModal(false)} />
              </Modal>
            )}
            <div className={styles._courseContainer}>
              {selectedResto &&
                selectedResto.courseList.map((course, i) => {
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
              <Link to={`/menuEditPage/${id}`}>
                <button>Edit Menu</button>
              </Link>
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
                            <DishItem selectedDish={dish} capitalLetter={capitalize} />
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
          <DeliveryInformation />
        </div>
      </div>
    </div>
  );
};
