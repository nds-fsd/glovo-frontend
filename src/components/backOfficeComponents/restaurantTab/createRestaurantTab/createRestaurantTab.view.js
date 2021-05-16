import React, { useState } from 'react';
import styles from './createRestaurantTab.module.css';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import { RestaurantForm } from '../../../forms/restaurantForm/restaurantForm.view';
import CategoryTags from '../../categoryTags';

export const CreateRestaurantTab = () => {
  const [categoryNames, setCategoryNames] = useState([]);

  const handleCategory = (catName) => {
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

  return (
    <div className={styles.container}>
      <div className={styles.restaurantImage}>
        <img src={ImageSkeleton} alt="camera" />
        <div className={styles.categoryDisplay}>
          <CategoryTags categoryNames={categoryNames} onClick={deleteCategory} tagType="create" />
        </div>
      </div>
      <div className={styles.form}>
        <RestaurantForm
          handleCategories={(e) => {
            handleCategory({ name: e.target.selectedOptions[0].innerText, _id: e.target.value });
          }}
          categories={categoryNames}
        />
      </div>
    </div>
  );
};
