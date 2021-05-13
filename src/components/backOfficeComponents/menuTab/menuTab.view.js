/* eslint-disable no-debugger */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import {
  CREATE_RESTAURANT,
  VIEW_RESTAURANT,
} from '../../../pages/backOfficePage/backOfficeContext/types';
import Button from '../../button';
import Paginator from '../paginator';
import styles from './menuTab.module.css';

export const MenuTab = () => {
  const {
    dispatch,
    state: { selectedRestaurant, viewMenu },
  } = useBackOfficeContext();
  const [limit, setLimit] = useState();
  const [search, setSearch] = useState();
  console.log(limit, search);
  const handleRedirectClick = () => {
    if (viewMenu) {
      dispatch({ type: VIEW_RESTAURANT });
    }
  };
  return (
    <div className={styles.container}>
      <h1 onClick={() => handleRedirectClick()} style={{ cursor: 'pointer' }}>
        {selectedRestaurant}
      </h1>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon icon="search" className={styles.searchIcon} />
          <input
            type="search"
            onBlur={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <Button buttonStyle="signup" onClick={() => dispatch({ type: CREATE_RESTAURANT })}>
          Create
        </Button>
      </header>
      <div className={styles.tableHeader}>
        <div className={styles.column} style={{ width: '30%' }}>
          Name
        </div>
        <div className={styles.column} style={{ width: '15%' }}>
          Categories
        </div>
        <div className={styles.column} style={{ width: '200px' }}>
          Description
        </div>
        <div className={styles.column} style={{ width: '20%' }}>
          Creation Date
        </div>
      </div>
      <div className={styles.restaurants}></div>
      <footer className={styles.footer}>
        <div className={styles.limit}>
          <p>Rows per Page</p>
          <select
            name="pagination"
            id="pagination"
            onChange={(e) => {
              setLimit(e.target.value);
            }}
          >
            <option value="1">1</option>
            <option value="5" selected>
              5
            </option>
            <option value="10">10</option>
          </select>
        </div>
        <Paginator />
      </footer>
    </div>
  );
};
