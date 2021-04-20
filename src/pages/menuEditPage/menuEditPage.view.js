/* eslint-disable no-console */
import React, { useState } from 'react';
import styles from './menuEditPage.module.css';
import DishList from '../../components/dishList';
import DishModal from '../../components/dishModal';

export const MenuEditPage = () => {
  const [handleModal, setHandleModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState();

  return (
    <div className={styles.container}>
      <DishList
        onDishClick={(value) => setSelectedDish(value)}
        openModal={() => setHandleModal(true)}
      />

      <DishModal
        open={handleModal}
        onClose={() => setHandleModal(false)}
        selectedDish={selectedDish}
      />
    </div>
  );
};
