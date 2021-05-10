import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useRestaurants } from '../../../../hooks/useRestaurants';
import Button from '../../../button';
import { backOfficeContext } from '../../../context/backOfficeContext';
import Paginator from '../../paginator';
import Row from '../../row';
import styles from './allRestaurantsTab.module.css';

export const AllRestaurantsTab = () => {
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const { setCreateRestaurant } = useContext(backOfficeContext);
  const [search, setSearch] = useState();
  const {
    userRestaurants,
    totalPages,
    filteredRestaurants,
    filterRestaurants,
    clearFilter,
    filteredPages,
  } = useRestaurants(currentPage - 1, limit, search);

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  useEffect(() => {
    if (search) {
      filterRestaurants(currentPage - 1, limit, search);
      return;
    }
    clearFilter();
  }, [search, limit, currentPage]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon icon="search" className={styles.searchIcon} />
          <input
            type="search"
            onBlur={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <Button buttonStyle="signup" onClick={() => setCreateRestaurant(true)}>
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
      <div className={styles.restaurants}>
        {userRestaurants &&
          !filteredRestaurants &&
          userRestaurants.list.map((restaurant) => <Row restaurant={restaurant} />)}
        {filteredRestaurants &&
          filteredRestaurants.list.map((restaurant) => <Row restaurant={restaurant} />)}
      </div>
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
        <Paginator
          totalPages={filteredPages || totalPages}
          currentPage={currentPage}
          setCurrentPage={(page) => setCurrentPage(page)}
        />
      </footer>
    </>
  );
};
