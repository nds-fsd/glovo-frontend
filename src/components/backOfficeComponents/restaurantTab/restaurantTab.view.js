/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './restaurantTab.module.css';
import ImageSkeleton from '../../../assets/images/camera.svg';
import CategorySelect from '../../categorySelect';

// const options = ['opcion 1', 'opcion 2', 'opcion 3', 'opcion 4', 'opcion 5', 'opcion 6'];

export const RestaurantTab = () => {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  const handleChange = (value) => {
    if (selectedCategory.length === 0) {
      setSelectedCategory([value]);
      return;
    }
    if (selectedCategory.includes(value)) {
      const newArray = selectedCategory.filter((category) => category !== value);
      setSelectedCategory(newArray);
      return;
    }
    if (!selectedCategory.includes(value)) {
      setSelectedCategory([...selectedCategory, value]);
    }
  };
  const handleName = (catName) => {
    if (categoryNames.length === 0) {
      setCategoryNames([catName]);
      return;
    }
    if (categoryNames.includes(catName)) {
      const newArray = categoryNames.filter((category) => category !== catName);
      setCategoryNames(newArray);
      return;
    }
    if (!categoryNames.includes(catName)) {
      setCategoryNames([...categoryNames, catName]);
    }
  };

  useEffect(() => {
    console.debug('useEffect', selectedCategory.sort());
    console.debug('names', categoryNames);
  }, [selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.restaurantImage}>
        <img src={ImageSkeleton} alt="camera" />
      </div>
      <div className={styles.form}>
        <div className={styles.categoryDisplay}>
          <div className={styles.categoryTags}>
            {categoryNames.length > 0 &&
              categoryNames.map((cat) => (
                <div className={styles.tag}>
                  {cat} <FontAwesomeIcon icon="times" />{' '}
                </div>
              ))}
          </div>
          <CategorySelect
            onChange={(e) => {
              handleChange(e.target.value);
              handleName(e.target.selectedOptions[0].innerText);
            }}
          />
        </div>
        <form>
          <div className={styles.name_and_address}>
            <input type="text" placeholder="name" />
            <div className={styles.address}>
              <input type="text" placeholder="street" />
              <input type="text" placeholder="number" />
              <input type="text" placeholder="zipcode" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
