/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import styles from './menuEditPage.module.css';
import DishList from '../../components/dishList';
import CreateCourse from '../../components/createCourse';
import { DishModal } from '../../components/dishModal/dishModal.view';

export const MenuEditPage = () => {
  const [handleModal, setHandleModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState();
  const [toggle, setToggle] = useState(false);
  const [modalNewCourse, setmodalNewCourse] = useState(false);

  return (
    <div className={styles.container}>
      <DishList
        onDishClick={(value) => setSelectedDish(value)}
        openModal={() => setHandleModal(true)}
        toggle={toggle}
        openModalNewCourse={() => setmodalNewCourse(true)}
      />

      <DishModal
        open={handleModal}
        onClose={() => setHandleModal(false)}
        selectedDish={selectedDish}
        onToggle={() => setToggle(!toggle)}
      />

      <CreateCourse
        open={modalNewCourse}
        onClose={() => setmodalNewCourse(false)}
        onToggle={() => setToggle(!toggle)}
      />
    </div>
  );
};
