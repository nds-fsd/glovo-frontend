/* eslint-disable no-unused-vars */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDishes } from '../../../hooks/useDishes';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import {
  BACK_TO_COURSES,
  CREATE_DISH,
  VIEW_RESTAURANT,
} from '../../../pages/backOfficePage/backOfficeContext/types';
import Button from '../../button';
import SearchBar from '../../searchBar';
import CourseRow from '../courseRow';
import DishRow from '../dishRow';
import Paginator from '../paginator';
import styles from './dishesTab.module.css';

export const DishesTab = () => {
  const {
    dispatch,
    state: { selectedRestaurant, viewMenu, selectedCourse, deleteRestaurantModal, createDish },
  } = useBackOfficeContext();
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const { id } = useParams();
  const {
    getDishes,
    dishes,
    totalPages,
    filterDishes,
    clearFilter,
    filteredPages,
    filteredDishes,
  } = useDishes();

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  useEffect(() => {
    getDishes({ courseId: selectedCourse.id, page: currentPage - 1, limit });
  }, [currentPage, limit, id, deleteRestaurantModal, createDish]);

  useEffect(() => {
    if (search) {
      filterDishes({ courseId: selectedCourse.id, pag: currentPage - 1, lim: limit, search });
      return;
    }
    clearFilter();
  }, [search, limit, currentPage]);

  const handleRedirectClick = () => {
    if (selectedCourse.name) {
      dispatch({ type: BACK_TO_COURSES });
      return;
    }
    if (viewMenu) {
      dispatch({ type: VIEW_RESTAURANT });
    }
  };
  return (
    <>
      <div className={styles.title}>
        <h1
          className={styles.selectedRestaurant}
          onClick={() => handleRedirectClick()}
          style={{ cursor: 'pointer' }}
        >
          {`${selectedRestaurant}  `}
        </h1>
        <h1 style={{ margin: '0.2em 10px' }}>
          <FontAwesomeIcon icon="caret-right" />
          {` ${selectedCourse.name}`}
        </h1>
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <SearchBar handleSearch={(query) => setSearch(query)} />
          </div>
          <Button buttonStyle="signup" onClick={() => dispatch({ type: CREATE_DISH })}>
            Create
          </Button>
        </header>
        <div className={styles.tableHeader}>
          <div className={styles.column} style={{ width: '32%' }}>
            Name
          </div>
          <div className={styles.column} style={{ width: '15%' }}>
            Price
          </div>
          <div className={styles.column} style={{ width: '200px' }}>
            Description
          </div>
          <div className={styles.column} style={{ width: '20%' }}>
            Creation Date
          </div>
        </div>
        <div className={styles.restaurants}>
          {dishes &&
            !filteredDishes &&
            dishes.list.map((dish) => {
              return <DishRow dish={dish} />;
            })}
          {filteredDishes && filteredDishes.list.map((dish) => <DishRow dish={dish} />)}
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
