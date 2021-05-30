import React, { useEffect, useState } from 'react';
import { useRestaurants } from '../../../../hooks/useRestaurants';
import Button from '../../../button';
import { useBackOfficeContext } from '../../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import Paginator from '../../paginator';
import Row from '../../row';
import styles from './allRestaurantsTab.module.css';
import { CREATE_RESTAURANT } from '../../../../pages/backOfficePage/backOfficeContext/types';
import SearchBar from '../../../searchBar';
import Loading from '../../../loading';

export const AllRestaurantsTab = () => {
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    dispatch,
    state: { deleteRestaurantModal },
  } = useBackOfficeContext();
  const [search, setSearch] = useState();
  const {
    userRestaurants,
    totalPages,
    filteredRestaurants,
    filterRestaurants,
    clearFilter,
    filteredPages,
    getRestaurants,
    isLoading,
  } = useRestaurants();

  useEffect(() => {
    getRestaurants({ page: currentPage - 1, limit });
  }, [currentPage, limit, deleteRestaurantModal]);

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
      <div className={styles.title}>
        <h1 className={styles.selectedRestaurant}>Restaurants</h1>
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <SearchBar handleSearch={(query) => setSearch(query)} />
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
        <div className={styles.restaurants}>
          {isLoading && <Loading />}
          {!isLoading &&
            userRestaurants &&
            !filteredRestaurants &&
            userRestaurants.list.map((restaurant) => (
              <Row key={restaurant._id} restaurant={restaurant} />
            ))}
          {!isLoading &&
            filteredRestaurants &&
            filteredRestaurants.list.map((rest) => <Row key={rest._id} restaurant={rest} />)}
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
              style={{ backgroundColor: 'var(--lightSalyGray)' }}
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
      </div>
    </>
  );
};
