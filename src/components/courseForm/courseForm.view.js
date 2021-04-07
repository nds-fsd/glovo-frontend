/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../assets/utils/fetch.utils';
import { COURSE } from '../../router/router';
import { InputText } from '../inputText/inputText.view';
import styles from './courseForm.module.css';

export const CourseForm = () => {
  const [newCourse, setNewCourse] = useState();
  const [courseError, setCourseError] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    shortFetch({
      url: `${COURSE}/search`,
      method: 'POST',
      body: { Restaurant: '606e17198db5b35d084630e0' },
      onSuccess: setCourseList,
    });
  }, [toggle]);

  const handleClick = () => {
    let error = false;
    if (!newCourse) {
      setCourseError(true);
      error = true;
    } else {
      setCourseError(false);
    }
    if (error) {
      return null;
    }
    shortFetch({
      url: COURSE,
      method: 'POST',
      body: { Restaurant: '606e17198db5b35d084630e0', name: newCourse },
      onSuccess: () => {
        setToggle(!toggle);
        setNewCourse('');
      },
    });
  };

  return (
    <>
    <div className={styles.container}>
      <p>{id}</p>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <InputText
          placeholder="Name"
          label="Name"
          value={newCourse}
          handleChange={setNewCourse}
          inputId="resName"
          error={courseError}
          errorMessage="Please add a Name"
        />
        <button onClick={handleClick}>create</button>
      </div>
      <div className={`${styles.subContainer} ${styles.title}`}>
        <p>COURSES</p>
        <ul>
          {courseList.map((course) => (
            <li>{course.name}</li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
};
