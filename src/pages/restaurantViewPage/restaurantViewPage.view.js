/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './restaurantViewPage.module.css';
import Modal from '../../components/modal';
import DishItem from '../../components/dishItem';
import RestaurantUpdateForm from '../../components/forms/restaurantUpdateForm';
import { BACKEND } from '../../router/router';

export const RestaurantViewPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { id } = useParams();
  const [selectedResto, setSelectedResto] = useState();
  const [courseSelected, setCourseSelected] = useState();
  const [dishByCourse, setDishByCourse] = useState();
  const [oneDish, setOneDish] = useState();

  useEffect(() => {
    fetch(`${BACKEND}/restaurant/${id}`)
      .then((response) => {
        if (!response.ok) {
          return Promise.reject();
        }
        return response.json();
      })
      .then((restaurant) => {
        setSelectedResto(restaurant);
      })
      .catch((err) => {
        return console.log(err);
      });
  }, [isOpenModal]);

  useEffect(() => {
    if (courseSelected) {
      fetch(`${BACKEND}/course/all/${id}`)
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((dishes) => {
          setDishByCourse(dishes);
        })
        .catch((err) => {
          return console.log(err);
        });
    }
  }, [courseSelected]);

  const handleClick = (courseId) => {
    setCourseSelected(courseId);
    dishByCourse && setOneDish(dishByCourse.filter((course) => course._id === courseSelected));
  };

  return (
    <div>
      {selectedResto && (
        <div className={styles._restoInfo}>
          <p>{selectedResto.name}</p>
          <p>{selectedResto.restaurantCategory.name}</p>
          <p>{selectedResto.restaurantDescription}</p>
          <button onClick={() => setIsOpenModal(true)}>Edit</button>
        </div>
      )}
      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)} open={isOpenModal} title="Modify your data">
          <RestaurantUpdateForm onClose={() => setIsOpenModal(false)} />
        </Modal>
      )}
      <div className={styles._restoCourse}>
        {selectedResto &&
          selectedResto.courseList.map((course) => {
            return (
              <div>
                <div className={styles._courses}>
                  <p onClick={() => handleClick(course._id)}>{course.name}</p>
                </div>
              </div>
            );
          })}
        <Link to={`/menuEditPage/${id}`}>
          <button>Edit Menu</button>
        </Link>
      </div>
      <div>
        {oneDish &&
          oneDish[0].dishList.map((dish) => (
            <div>
              <DishItem selectedDish={dish} />
            </div>
          ))}
      </div>
    </div>
  );
};
