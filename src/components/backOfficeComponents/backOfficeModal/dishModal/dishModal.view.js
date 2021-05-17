/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourses } from '../../../../hooks/useCourses';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { BackOfficeModal } from '../backOfficeModal.view';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import styles from './dishModal.module.css';
import { DishForm } from '../../../forms/dishForm/dishForm.view';

export const DishModal = ({ onClose, open, dishModal }) => {
  return (
    <BackOfficeModal
      dishModal={dishModal}
      onClose={() => {
        onClose();
      }}
      open={open}
    >
      <div className={styles.container}>
        <div style={{ display: 'flex', height: '85%', width: '100%' }}>
          <div className={styles.imageContainer}>
            <h3>Create Dish</h3>
            <div className={styles.imageCase}>
              <img src={ImageSkeleton} alt="camera Case" />
            </div>
          </div>
          <div className={styles.formContainer}>
            <DishForm />
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </BackOfficeModal>
  );
};
