/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-debugger */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './restaurantTab.module.css';
import ImageSkeleton from '../../../assets/images/camera.svg';
import CategorySelect from '../../categorySelect';

// * const options = ['opcion 1', 'opcion 2', 'opcion 3', 'opcion 4', 'opcion 5', 'opcion 6'];

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

  const deleteCategory = (cate) => {
    const newArr = categoryNames.filter((catego) => catego !== cate);
    setCategoryNames(newArr);
  };

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
                  <p>{cat}</p>{' '}
                  <FontAwesomeIcon
                    icon="times"
                    onClick={() => {
                      deleteCategory(cat);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
        <form>
          <div className={styles.inputs}>
            <div className={styles.category_and_name}>
              <div className={styles.inputContainerA}>
                <input className={styles.input} type="text" placeholder="Name" />
              </div>
              <CategorySelect
                onChange={(e) => {
                  handleChange(e.target.value);
                  handleName(e.target.selectedOptions[0].innerText);
                }}
              />
            </div>
            <div className={styles.address}>
              <div className={styles.inputContainer}>
                <input className={styles.input} type="text" placeholder="Street" />
              </div>
              <div className={styles.inputContainer}>
                <input className={styles.input} type="text" placeholder="Number" />
              </div>
              <div className={styles.inputContainer}>
                <input className={styles.input} type="text" placeholder="Zipcode" />
              </div>
            </div> 
          </div>
          <div className={styles.text_and_submit}>
            <div className={styles.textAreaContainer}>
              <textarea className={styles.textArea} placeholder="  Restaurant Description" />
            </div>
            <input className={styles.submit} type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};
