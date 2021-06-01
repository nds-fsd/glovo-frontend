/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Loading from '../../loading';
import SearchBar from '../../searchBar';
import { usePage } from '../../../hooks/usePage';
import Paginator from '../paginator';
import styles from './usersTab.module.css';
import UserRow from '../userRow';
import DeleteRestaurantModal from '../backOfficeModal/deleteRestaurantModal';
import { useBackOfficeContext } from '../../../pages/backOfficePage/backOfficeContext/backOfficeContext';

export const UsersTab = () => {
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState();
  const [selectedSort, setSelectedSort] = useState('firstName');
  const [direction, setDirection] = useState(false);

  const {
    userState: { deleteModal, editModal },
  } = useBackOfficeContext();
  const {
    isLoading,
    getElements: getUsers,
    filterElements: filterUsers,
    elements: users,
    filteredElements: filteredUsers,
    clearFilter,
    filteredPages,
    totalPages,
  } = usePage('user');

  useEffect(() => {
    setCurrentPage(1);
  }, [limit]);

  useEffect(() => {
    let parsedDir;
    if (direction) {
      parsedDir = 'asc';
    }
    if (!direction) {
      parsedDir = 'dsc';
    }
    getUsers({ body: {}, page: currentPage - 1, limit, sort: selectedSort, dir: parsedDir });
  }, [currentPage, limit, selectedSort, direction, deleteModal, editModal]);

  useEffect(() => {
    if (search) {
      filterUsers({ pag: currentPage - 1, lim: limit, query: { email: search } });
      return;
    }
    clearFilter();
  }, [search, limit, currentPage, deleteModal, editModal]);

  return (
    <>
      <h1 className={styles.title}>Users</h1>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.searchBar}>
            <SearchBar handleSearch={(query) => setSearch(query)} />
          </div>
        </header>
        <div className={styles.tableHeader}>
          <div
            className={classNames([styles.column], {
              [styles.selected]: selectedSort === 'firstName',
            })}
            style={{ width: '20%' }}
            onClick={() => {
              setSelectedSort('firstName');
              setDirection(!direction);
            }}
          >
            Name
            {selectedSort === 'firstName' && (
              <FontAwesomeIcon icon={direction ? 'angle-up' : 'angle-down'} />
            )}
          </div>
          <div
            className={classNames([styles.column], {
              [styles.selected]: selectedSort === 'role',
            })}
            style={{ width: '15%' }}
            onClick={() => {
              setSelectedSort('role');
              setDirection(!direction);
            }}
          >
            Role
            {selectedSort === 'role' && (
              <FontAwesomeIcon icon={direction ? 'angle-up' : 'angle-down'} />
            )}
          </div>
          <div
            className={classNames([styles.column], {
              [styles.selected]: selectedSort === 'email',
            })}
            style={{ width: '30%' }}
            onClick={() => {
              setSelectedSort('email');
              setDirection(!direction);
            }}
          >
            Email
            {selectedSort === 'email' && (
              <FontAwesomeIcon icon={direction ? 'angle-up' : 'angle-down'} />
            )}
          </div>
          <div
            className={classNames([styles.column], {
              [styles.selected]: selectedSort === 'createdAt',
            })}
            style={{ width: '25%' }}
            onClick={() => {
              setSelectedSort('createdAt');
              setDirection(!direction);
            }}
          >
            Creation Date
            {selectedSort === 'createdAt' && (
              <FontAwesomeIcon icon={direction ? 'angle-up' : 'angle-down'} />
            )}
          </div>
        </div>
        <div className={styles.users}>
          {isLoading && <Loading />}
          {!isLoading &&
            users &&
            !filteredUsers &&
            users.list.map((user) => {
              return <UserRow key={user._id} user={user} />;
            })}
          {!isLoading &&
            filteredUsers &&
            filteredUsers.list.map((user) => <UserRow key={user._id} user={user} />)}
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
              <option value="10">10</option>
              <option value="25" selected>
                25
              </option>
              <option value="50">50</option>
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
