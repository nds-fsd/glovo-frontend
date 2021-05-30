import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourses } from '../../../hooks/useCourses';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import {
  BACK_TO_COURSES,
  CREATE_COURSE,
  VIEW_RESTAURANT,
} from '../../../pages/backOfficePage/backOfficeContext/types';
import Button from '../../button';
import Loading from '../../loading';
import SearchBar from '../../searchBar';
import CourseRow from '../courseRow';
import Paginator from '../paginator';
import styles from './menuTab.module.css';

export const MenuTab = () => {
  const {
    dispatch,
    state: { selectedRestaurant, viewMenu, selectedCourse, createCourse, deleteRestaurantModal },
  } = useBackOfficeContext();
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const { id } = useParams();
  const {
    getCourses,
    courses,
    totalPages,
    filterCourses,
    clearFilter,
    filteredPages,
    filteredCourses,
    isLoading,
  } = useCourses();

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  useEffect(() => {
    getCourses({ id, page: currentPage - 1, limit });
  }, [currentPage, limit, id, createCourse, deleteRestaurantModal]);

  useEffect(() => {
    if (search) {
      filterCourses({ id, pag: currentPage - 1, lim: limit, search });
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
          {selectedRestaurant}
        </h1>
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <SearchBar handleSearch={(query) => setSearch(query)} />
          </div>
          <Button buttonStyle="signup" onClick={() => dispatch({ type: CREATE_COURSE })}>
            Create
          </Button>
        </header>
        <div className={styles.tableHeader}>
          <div className={styles.column} style={{ width: '30%' }}>
            Name
          </div>
          <div className={styles.column} style={{ width: '20%' }}>
            Creation Date
          </div>
          <div className={styles.column} style={{ width: '15%' }}></div>
        </div>
        <div className={styles.restaurants}>
          {isLoading && <Loading />}
          {!isLoading &&
            courses &&
            !filteredCourses &&
            courses.list.map((course) => {
              return <CourseRow key={course._id} course={course} />;
            })}
          {!isLoading &&
            filteredCourses &&
            filteredCourses.list.map((course) => <CourseRow key={course._id} course={course} />)}
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
