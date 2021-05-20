/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './createRestaurantTab.module.css';
import ImageSkeleton from '../../../../assets/images/camera.svg';
import RestaurantForm from '../../../forms/restaurantForm';
import { ReactComponent as Gmaps } from '../../../../assets/icons/Google_Maps_Logo_2020.svg';
import CategoryTags from '../../categoryTags';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';

export const CreateRestaurantTab = () => {
  const { image } = useBackOfficeContext();
  const [categoryNames, setCategoryNames] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const initMap = () => {
    const center = { lat: coordinates.lat, lng: coordinates.lng };

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center,
    });
    const marker = new google.maps.Marker({
      position: center,
      map,
    });
  };
  useEffect(() => {
    if (coordinates.lat && coordinates.lng) {
      initMap();
    }
  }, [coordinates]);

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
      <div className={styles.column1}>
        <label htmlFor="file-input" className={styles.restaurantImage}>
          <div className={styles.imageCase}>
            <img
              src={image || ImageSkeleton}
              alt="camera"
              className={classNames({ [styles.img]: image })}
            />
            {!image && <FontAwesomeIcon icon="upload" style={{ color: 'var(--salyGray)' }} />}
          </div>
        </label>
        <div className={styles.categoryDisplay}>
          <CategoryTags categoryNames={categoryNames} onClick={deleteCategory} tagType="create" />
        </div>
        <div id="map" className={styles.map}>
          <Gmaps className={styles.icon} />
        </div>
      </div>
      <div className={styles.column2}>
        <RestaurantForm
          handleCoordinates={(value) => setCoordinates(value)}
          handleCategories={(e) => {
            handleCategory({ name: e.target.selectedOptions[0].innerText, _id: e.target.value });
          }}
          categories={categoryNames}
        />
      </div>
    </div>
  );
};
