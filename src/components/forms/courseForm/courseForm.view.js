import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { shortFetch } from '../../../assets/utils/fetch.utils';
import { isRequired } from '../../../assets/utils/validations.utils';
import { COURSE } from '../../../router/router';
import { InputText } from '../../inputText/inputText.view';
import styles from './courseForm.module.css';

export const CourseForm = ({ toggle, courseList }) => {
  const [newCourse, setNewCourse] = useState();
  const [anyError, setAnyError] = useState({ name: true });

  const { id } = useParams();

  const handleClick = () => {
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
            onError={(isError) => setAnyError({ ...anyError, name: isError })}
            validations={[{ func: isRequired, message: 'this field is required' }]}
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
