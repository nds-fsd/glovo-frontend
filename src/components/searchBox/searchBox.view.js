/* eslint-disable no-console */
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './searchBox.module.css';
import { RestoListContext } from '../context/restoListPageContext';
import { RESTAURANT_LIST_PAGE } from '../../router/router';

export const SearchBox = () => {
  const history = useHistory();
  const { setIsSearching } = useContext(RestoListContext);
  const isTyping = (evt) => {
    setIsSearching(true);
    history.push(`${RESTAURANT_LIST_PAGE}/search?search=${evt.target.value}`);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => isTyping(event)}
        onBlur={() => setIsSearching(false)}
      />
    </div>
  );
};
