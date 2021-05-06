import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { shortFetch } from '../../../../assets/utils/fetch.utils';
import { getUserSession } from '../../../../assets/utils/localStorage.utils';
import { RESTAURANT } from '../../../../router/router';
import Button from '../../../button';
import Row from '../../row';
import styles from './allRestaurantsTab.module.css';

export const AllRestaurantsTab = () => {
  const [userRestaurants, setUserRestaurants] = useState([]);
  useEffect(() => {
    const userId = getUserSession().id;
    shortFetch({
      url: `${RESTAURANT}/search`,
      method: 'POST',
      body: {
        user: userId,
      },
      token: true,
      onSuccess: setUserRestaurants,
    });
  }, []);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon icon="search" className={styles.searchIcon} />
          <input type="search" className={styles.searchInput} />
        </div>
        <Button buttonStyle="signup">Create</Button>
      </header>
      <div className={styles.tableHeader}>
        <div className={styles.column} style={{ width: '32%' }}>
          Name
        </div>
        <div className={styles.column} style={{ width: '15%' }}>
          Categories
        </div>
        <div className={styles.column} style={{ width: '33%' }}>
          Description
        </div>
        <div className={styles.column} style={{ width: '20%' }}>
          Creation Date
        </div>
      </div>
      <div className={styles.restaurants}>
        {userRestaurants.map((restaurant) => (
          <Row restaurant={restaurant} />
        ))}
      </div>
      <footer className={styles.footer}>
        <p>Rows per Page</p>
        <select name="pagination" id="pagination">
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </footer>
    </>
  );
};
