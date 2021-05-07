/* eslint-disable no-console */
import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './searchBox.module.css';
import { RestoListContext } from '../context/restoListPageContext';
import { RESTAURANT_LIST_PAGE } from '../../router/router';

export const SearchBox = () => {
  const history = useHistory();
  const location = useLocation();
  const { setIsSearching } = useContext(RestoListContext);
  const isTyping = (evt) => {
    setIsSearching(true);
    history.push(`${RESTAURANT_LIST_PAGE}/search?name=${evt.target.value}`);
    console.log(evt);
  };
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Search"
        onChange={(event) => isTyping(event)}
        onBlur={() => setIsSearching(false)}
      />
      {console.log(location)}
    </div>
  );
};
