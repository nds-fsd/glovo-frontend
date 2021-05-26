import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styles from './searchBar.module.css';

export const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeOutId = setTimeout(() => handleSearch(query), 600);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className={styles.searchBar}>
      <FontAwesomeIcon icon="search" className={styles.searchIcon} />
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />
    </div>
  );
};
