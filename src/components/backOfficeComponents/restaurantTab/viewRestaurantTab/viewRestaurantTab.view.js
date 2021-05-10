/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './viewRestaurantTab.module.css';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import CategoryTags from '../../categoryTags';
import Button from '../../../button';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../../router/router';
import { RestaurantForm } from '../../../forms/restaurantForm/restaurantForm.view';

export const ViewRestaurantTab = () => {
  const [savedRestaurant, setSavedRestaurant] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    // * Fetch to get the restaurant from the user
    shortFetch({
      url: `${RESTAURANT}/${id}`,
      method: 'GET',
      onSuccess: setSavedRestaurant,
      token: true,
    });
  }, [id, isEdit]);

  const handleCategory = (catName) => {
    if (savedRestaurant.name) {
      const upRes = { ...savedRestaurant };
      const check = savedRestaurant.restaurantCategory.filter((catego) => {
        return catego.name === catName.name;
      });
      if (check.length === 0) {
        upRes.restaurantCategory.push(catName);
        setSavedRestaurant(upRes);
        return;
      }
      if (check.length > 0) {
        const newArray = savedRestaurant.restaurantCategory.filter((catego) => {
          return catego.name !== catName.name;
        });
        upRes.restaurantCategory = newArray;
        setSavedRestaurant(upRes);
      }
    }
  };

  useEffect(() => {
    console.debug(savedRestaurant);
  }, [savedRestaurant]);

  const deleteCategory = (cate) => {
    if (savedRestaurant.name) {
      const updatedRestaurant = { ...savedRestaurant };
      const newArray = savedRestaurant.restaurantCategory.filter((catego) => {
        return catego.name !== cate.name;
      });
      updatedRestaurant.restaurantCategory = newArray;
      setSavedRestaurant(updatedRestaurant);
    }
  };

  return (
    <>
      <div className={styles.restaurantImage}>
        <img src={ImageSkeleton} alt="camera" />
        {!isEdit && (
          <Button onClick={() => setIsEdit(true)} buttonStyle="edit">
            Edit
          </Button>
        )}
        {isEdit && (
          <>
            <Button onClick={() => setIsEdit(false)} buttonStyle="edit">
              Cancel
            </Button>
          </>
        )}
      </div>
      <div className={styles.form}>
        <div className={styles.categoryDisplay}>
          <CategoryTags
            categoryNames={savedRestaurant.restaurantCategory}
            onClick={deleteCategory}
            tagType={`${isEdit ? 'edit' : 'view'}`}
          />
        </div>
        {isEdit && (
          <RestaurantForm
            handleCategories={(e) => {
              handleCategory({ name: e.target.selectedOptions[0].innerText, _id: e.target.value });
            }}
            categories={savedRestaurant.restaurantCategory}
            restaurant={savedRestaurant}
            onUpdate={() => setIsEdit(false)}
          />
        )}
        <p>{savedRestaurant && savedRestaurant.name}</p>
      </div>
    </>
  );
};
