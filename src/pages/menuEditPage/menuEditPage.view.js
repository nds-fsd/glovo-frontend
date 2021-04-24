/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import styles from './menuEditPage.module.css';
import DishList from '../../components/dishList';
import CreateCourse from '../../components/createCourse';
import { DishModal } from '../../components/dishModal/dishModal.view';
import CreateDish from '../../components/createDish';

export const MenuEditPage = () => {
  const [handleModal, setHandleModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState();
  const [toggle, setToggle] = useState(false);
  const [modalNewCourse, setModalNewCourse] = useState(false);
  const [modalNewDish, setModalNewDish] = useState(false);
  const [getCourseId, setGetCourseId] = useState();

  return (
    <div className={styles.container}>
      <DishList
        onDishClick={(value) => setSelectedDish(value)}
        openModal={() => setHandleModal(true)}
        toggle={toggle}
        openModalNewCourse={() => setModalNewCourse(true)}
        openModalNewdish={() => setModalNewDish(true)}
        onCourseClick={(value) => setGetCourseId(value)}
      />

      <DishModal
        open={handleModal}
        onClose={() => setHandleModal(false)}
        selectedDish={selectedDish}
        onToggle={() => setToggle(!toggle)}
      />

      <CreateCourse
        open={modalNewCourse}
        onClose={() => setModalNewCourse(false)}
        onToggle={() => setToggle(!toggle)}
      />

      <CreateDish
        open={modalNewDish}
        onClose={() => setModalNewDish(false)}
        courseId={getCourseId}
      />
    </div>
  );
};
