/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useCourses } from '../../../../hooks/useCourses';
import { roleContext } from '../../../context/roleContext';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import styles from './dishModal.module.css';
import DishForm from '../../../forms/dishForm';

export const DishModal = ({ onClose, open, bigModal }) => {
  const {
    dishImg,
    setDishImg,
    state: { selectedDish },
  } = useBackOfficeContext();
  const chooseImg = () => {
    if (dishImg) {
      return dishImg;
    }
    if (selectedDish.img) {
      return selectedDish.img;
    }
    return ImageSkeleton;
  };

  return (
    <BackOfficeModal
      bigModal={bigModal}
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <div className={styles.container}>
        {console.log(typeof ImageSkeleton)}
        <div style={{ display: 'flex', height: '85%', width: '100%' }}>
          <div className={styles.imageContainer}>
            <h3>Create Dish</h3>
            <div
              className={styles.imageCase}
              style={{ backgroundImage: `url(${chooseImg()}) ` }}
            ></div>
          </div>
          <div className={styles.formContainer}>
            <DishForm imgSetter={() => setDishImg()} />
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </BackOfficeModal>
  );
};
