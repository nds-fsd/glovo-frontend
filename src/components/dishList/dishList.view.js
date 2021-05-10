import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './dishList.module.css';
import DishItem from '../dishItem';
import { RESTAURANT, DISH, COURSE } from '../../router/router';
import { shortFetch } from '../../assets/utils/fetch.utils';

export const DishList = ({
  openModal,
  onDishClick,
  toggle,
  openModalNewCourse,
  openModalNewdish,
  openModalUpdateCourse,
  onCourseClick,
}) => {
  const [restaurant, setRestaurant] = useState();
  const [isDishList] = useState(true);
  const { id } = useParams();

  const deleteDish = (dishId) => {
    shortFetch({ url: `${DISH}/${dishId}`, token: true, method: 'DELETE' });
  };
  useEffect(() => {
    shortFetch({
      url: `${RESTAURANT}/${id}`,
      token: true,
      method: 'GET',
      onSuccess: setRestaurant,
    });
  }, [id, toggle, deleteDish]);

  const deleteCourse = (courseId) => {
    shortFetch({
      url: `${COURSE}/deleteAll/${courseId}`,
      method: 'DELETE',
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
                <p
                  style={{
                    color: '#E0E0E0',
                    paddingLeft: '10px',
                    fontSize: '20px',
                  }}
                >
                  {cat.name}
                  <span>
                    <button onClick={() => deleteCourse(cat._id)}>X</button>
                    <button
                      onClick={() => {
                        openModalUpdateCourse();
                        onCourseClick({
                          id: cat._id,
                        });
                      }}
                    >
                      Update Course
                    </button>
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
