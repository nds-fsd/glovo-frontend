/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './viewRestaurantTab.module.css';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import CategoryTags from '../../categoryTags';
import CategorySelect from '../../../categorySelect';
import Button from '../../../button';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../../router/router';

export const ViewRestaurantTab = ({ handleName, deleteCategory }) => {
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
  }, [id]);

  useEffect(() => {
    console.debug(savedRestaurant);
  }, [savedRestaurant]);

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
            <Button onClick={() => setIsEdit(false)}>Cancel</Button>
            <Button>Save</Button>
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
          <CategorySelect
            onChange={(e) => {
              handleName({ name: e.target.selectedOptions[0].innerText, _id: e.target.value });
            }}
          />
        )}
        <p>{savedRestaurant && savedRestaurant.name}</p>
      </div>
    </>
  );
};
