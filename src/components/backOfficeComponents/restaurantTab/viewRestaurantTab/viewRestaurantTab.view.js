/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactComponent as Gmaps } from '../../../../assets/icons/Google_Maps_Logo_2020.svg';

import styles from './viewRestaurantTab.module.css';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import CategoryTags from '../../categoryTags';
import Button from '../../../button';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { RESTAURANT } from '../../../../router/router';
import { RestaurantForm } from '../../../forms/restaurantForm/restaurantForm.view';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { VIEW_MENU } from '../../../../pages/backOfficePage/backOfficeContext/types';
import { RestaurantInfo } from '../../restaurantInfo/restaurantInfo.view';

export const ViewRestaurantTab = () => {
  const [savedRestaurant, setSavedRestaurant] = useState([]);
  const { dispatch } = useBackOfficeContext();
  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  useEffect(() => {
    // * Fetch to get the restaurant from the user
    shortFetch({
      url: `${RESTAURANT}/${id}`,
      method: 'GET',
      onSuccess: setSavedRestaurant,
      token: true,
    });
  }, [id, isEdit]);

  const initMap = () => {
    let center;
    if (coordinates) {
      center = {
        lat: parseFloat(coordinates?.lat),
        lng: parseFloat(coordinates?.lng),
      };
    }
    if (savedRestaurant) {
      center = {
        lat: parseFloat(savedRestaurant?.coordinates?.lat),
        lng: parseFloat(savedRestaurant?.coordinates?.lng),
      };
    }

    const map = new google.maps.Map(document.getElementById('map2'), {
      zoom: 15,
      center,
    });
    const marker = new google.maps.Marker({
      position: center,
      map,
    });
  };

  useEffect(() => {
    if (savedRestaurant?.coordinates?.lat && savedRestaurant?.coordinates?.lng) {
      initMap();
    }
  }, [savedRestaurant]);

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
  console.debug(savedRestaurant);
  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.selectedRestaurant}>{savedRestaurant.name}</h1>
      </div>
      <div className={styles.container}>
        {!isEdit && (
          <Button
            buttonStyle="menu"
            onClick={() => {
              dispatch({ type: VIEW_MENU, payload: savedRestaurant.name });
            }}
          >
            View Menu
          </Button>
        )}
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
        <div className={styles.column1}>
          <label htmlFor="file-input2" className={styles.restaurantImage}>
            <div className={styles.imageCase}>
              <img
                src={savedRestaurant?.image}
                alt="camera"
                className={classNames({ [styles.img]: true })}
              />
              {!true && <FontAwesomeIcon icon="upload" style={{ color: 'var(--salyGray)' }} />}
            </div>
          </label>
          <div className={styles.categoryDisplay}>
            <CategoryTags
              categoryNames={savedRestaurant.restaurantCategory}
              onClick={deleteCategory}
              tagType={`${isEdit ? 'edit' : 'view'}`}
            />
          </div>
          <div id="map2" className={styles.map}>
            <Gmaps className={styles.icon} />
          </div>
        </div>
        <div className={styles.column2}>
          {!isEdit && <RestaurantInfo restaurant={savedRestaurant} />}
          {isEdit && (
            <RestaurantForm
              handleCoordinates={(value) => setCoordinates(value)}
              handleCategories={(e) => {
                handleCategory({
                  name: e.target.selectedOptions[0].innerText,
                  _id: e.target.value,
                });
              }}
              categories={savedRestaurant.restaurantCategory}
              restaurant={savedRestaurant}
              onUpdate={() => setIsEdit(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};
