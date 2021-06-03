import { useEffect, useState } from 'react';
import { usePage } from '../../../hooks/usePage';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';
import { CREATE_CATEGORY } from '../../../pages/backOfficePage/backOfficeContext/types';
import Button from '../../button';
import Loading from '../../loading';
import SearchBar from '../../searchBar';
import CourseRow from '../courseRow';
import Paginator from '../paginator';
import styles from './categoriesTab.module.css';

export const CategoriesTab = () => {
  const {
    categoryDispatch,
    categoryState: { editModal, deleteModal },
  } = useBackOfficeContext();
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();

  const {
    isLoading,
    getElements: getCategories,
    filterElements: filterCategories,
    elements: categories,
    filteredElements: filteredCategories,
    clearFilter,
    filteredPages,
    totalPages,
  } = usePage('restaurantCategory');

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  useEffect(() => {
    getCategories({ page: currentPage - 1, limit, body: {}, dir: true, sort: 'name' });
  }, [currentPage, limit, editModal, deleteModal]);

  useEffect(() => {
    if (search) {
      filterCategories({
        pag: currentPage - 1,
        lim: limit,
        query: { name: search },
      });
      return;
    }
    clearFilter();
  }, [search, limit, currentPage, editModal, deleteModal]);

  return (
    <>
      <div className={styles.title}>
        <h1 className={styles.selectedRestaurant}>Categories</h1>
      </div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <SearchBar handleSearch={(query) => setSearch(query)} />
          </div>
          <Button buttonStyle="signup" onClick={() => categoryDispatch({ type: CREATE_CATEGORY })}>
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
            categories &&
            !filteredCategories &&
            categories?.list?.map((category) => {
              return <CourseRow key={category._id} category={category} />;
            })}
          {!isLoading &&
            filteredCategories &&
            filteredCategories?.list?.map((category) => (
              <CourseRow key={category._id} category={category} />
            ))}
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
