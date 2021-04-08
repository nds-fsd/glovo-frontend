/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styles from './dishForm.module.css';

export const DishForm = ({ courseList }) => {
  const [selectedCourse, setSelectedCourse] = useState();

  return (
    <div className={styles.container}>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <input type="text" placeholder="Dish Name" />
      </div>
      <div className={`${styles.subContainer} ${styles.category}`}>
        <select onChange={(e) => setSelectedCourse(e.target.value)}>
          <option value="" selected disabled hidden>
            Select a Course
          </option>
          {courseList.map((course) => (
            <option value={course._id}>{course.name}</option>
          ))}
        </select>
      </div>
      <div className={`${styles.subContainer} ${styles.description}`}>
        <input type="text" placeholder="Dish description" />
      </div>
      <div className={`${styles.subContainer} ${styles.price}`}>
        <input type="number" placeholder="price" />
      </div>
      <div className={`${styles.subContainer} ${styles.buttons}`}>
        <button>cancel</button>
        <button>create</button>
      </div>
    </div>
  );
};
