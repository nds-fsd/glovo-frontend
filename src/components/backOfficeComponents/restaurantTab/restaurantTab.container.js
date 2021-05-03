/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import styles from './restaurantTab.module.css';
import ImageSkeleton from '../../../assets/images/camera.svg';
import { RestaurantForm } from '../../forms/restaurantForm/restaurantForm.view';
import CategoryTags from '../categoryTags';

// * const options = ['opcion 1', 'opcion 2', 'opcion 3', 'opcion 4', 'opcion 5', 'opcion 6'];

export const RestaurantTab = () => {
  const [categoryNames, setCategoryNames] = useState([]);

  const handleName = (catName) => {
    const check = categoryNames.filter((catego) => {
      return catego.name === catName.name;
    });
    if (check.length === 0) {
      setCategoryNames([...categoryNames, catName]);
      return;
    }
    if (check.length > 0) {
      const newArray = categoryNames.filter((catego) => {
        return catego.name !== catName.name;
      });
      setCategoryNames(newArray);
    }
  };

  const deleteCategory = (cate) => {
    const newArray = categoryNames.filter((catego) => {
      return catego.name !== cate.name;
    });
    setCategoryNames(newArray);
  };
  useEffect(() => {
    console.debug('useEffect', categoryNames);
  }, [categoryNames]);

  return (
    <div className={styles.container}>
      <div className={styles.restaurantImage}>
        <img src={ImageSkeleton} alt="camera" />
      </div>
      <div className={styles.form}>
        <div className={styles.categoryDisplay}>
          <CategoryTags categoryNames={categoryNames} onClick={deleteCategory} />
        </div>
        <RestaurantForm
          handleCategories={(e) => {
            handleName({ name: e.target.selectedOptions[0].innerText, id: e.target.value });
          }}
          categories={categoryNames}
        />
      </div>
    </div>
  );
};
