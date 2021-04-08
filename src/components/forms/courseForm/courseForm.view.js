/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { COURSE } from '../../../router/router';
import { InputText } from '../../inputText/inputText.view';
import styles from './courseForm.module.css';

export const CourseForm = ({ toggle, courseList }) => {
  const [newCourse, setNewCourse] = useState();
  const [courseError, setCourseError] = useState(false);

  const { id } = useParams();

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
      body: { Restaurant: id, name: newCourse },
      onSuccess: () => {
        toggle();
        setNewCourse('');
      },
    });
  };

  return (
    <>
      <div className={styles.container}>
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
        <div className={`${styles.subContainer} ${styles.courses}`}>
          <p>COURSES</p>
          {courseList.map((course) => (
            <p>{course.name}</p>
          ))}
        </div>
      </div>
    </>
  );
};
