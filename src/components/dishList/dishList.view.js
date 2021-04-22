/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './dishList.module.css';
import DishItem from '../dishItem';
import { RESTAURANT, DISH, COURSE } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';

// This component makes a double .map(), first to get the category name and render the container,
// for each category, the second is to render all the dishes in that category.

export const DishList = ({
  openModal,
  onDishClick,
  toggle,
  openModalNewCourse,
  openModalNewdish,
  onCourseClick,
}) => {
  const [restaurant, setRestaurant] = useState();
  const [isDishList, setIsDishList] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    shortFetch({ url: `${RESTAURANT}/${id}`, method: 'GET', onSuccess: setRestaurant });
  }, [id, toggle]);

  const deleteDish = (dishId) => {
    shortFetch({ url: `${DISH}/${dishId}`, method: 'DELETE' });
  };

  useEffect(() => {
    shortFetch({ url: `${RESTAURANT}/${id}`, method: 'GET', onSuccess: setRestaurant });
  }, [deleteDish]);

  const deleteCourse = (courseId) => {
    shortFetch({
      url: `${COURSE}/${courseId}`,
      method: 'DELETE',
      onSuccess: console.log('delete'),
    });
  };

  return (
    <div className={styles.container}>
      <button onClick={openModalNewCourse}>CREATE COURSE</button>
      {restaurant &&
        restaurant.courseList.map((cat) => {
          return (
            <>
              <div>
                <p style={{ color: '#E0E0E0', paddingLeft: '10px', fontSize: '20px' }}>
                  {cat.name}
                  <span>
                    <button onClick={() => deleteCourse(cat._id)}>X</button>
                  </span>
                </p>
                <button
                  onClick={() => {
                    openModalNewdish();
                    onCourseClick({
                      id: cat._id,
                    });
                  }}
                >
                  create dish
                </button>
              </div>
              <div className={styles.category_container}>
                {cat.dishList.map((dish) => {
                  return (
                    <DishItem
                      selectedDish={dish}
                      onClick={openModal}
                      onDishClick={onDishClick}
                      deleteDish={deleteDish}
                      isDishList={isDishList}
                    />
                  );
                })}
              </div>
            </>
          );
        })}
    </div>
  );
};
