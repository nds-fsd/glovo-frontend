/* eslint-disable jsx-a11y/label-has-associated-control */

import { useEffect } from 'react';
import classNames from 'classnames';

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
  useEffect(() => {
    if (selectedDish) {
      setDishImg(selectedDish.img);
    }
  }, [selectedDish]);

  return (
    <BackOfficeModal
      bigModal={bigModal}
      onClose={() => {
        onClose();
        setDishImg('');
      }}
      open={open}
    >
      <div className={styles.container}>
        <div style={{ display: 'flex', height: '85%', width: '100%' }}>
          <div className={styles.imageContainer}>
            <h3>Create Dish</h3>
            <label htmlFor="dish-input" className={styles.imageCase}>
              <div className={styles.imageWrap}>
                <img
                  src={dishImg || ImageSkeleton}
                  alt="camera"
                  className={classNames({ [styles.img]: dishImg })}
                />
              </div>
            </label>
          </div>
          <div className={styles.formContainer}>
            <DishForm imgSetter={() => setDishImg('`')} />
          </div>
        </div>
        <div className={styles.footer}></div>
      </div>
    </BackOfficeModal>
  );
};
