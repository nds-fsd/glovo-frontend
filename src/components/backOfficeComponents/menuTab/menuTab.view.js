/* eslint-disable no-console */
/* eslint-disable no-debugger */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Button from '../../button';
import Paginator from '../paginator';
import styles from './menuTab.module.css';

export const MenuTab = () => {
  const [limit, setLimit] = useState();
  const [search, setSearch] = useState();
  console.log(limit, search);
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.searchBar}>
          <FontAwesomeIcon icon="search" className={styles.searchIcon} />
          <input
            type="search"
            onBlur={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <Button buttonStyle="signup">Create</Button>
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
