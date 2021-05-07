/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import classnames from 'classnames';
// import { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// import { RestoListContext } from '../context/restoListPageContext';
import { RESTAURANT_LIST_PAGE } from '../../router/router';
import styles from './categoryBar.module.css';

export const CategoryBar = ({ children }) => {
  // const { categorySelected } = useContext(RestoListContext);
  const history = useHistory();
  const location = useLocation();
  return (
    <div className={styles.container}>
      {console.log(location)}
      <ul className={styles.listContainer}>
        {children.map((item) => {
          return (
            <li
              key={item._id}
              className={classnames(styles.restaurantItem, {
                [styles.selected]: `?name=${item.name}` === history.location.search,
              })}
              onClick={(e) =>
                history.push(`${RESTAURANT_LIST_PAGE}/category?name=${e.target.textContent}`)
              }
              id={item._id}
            >
              {item.name}
              {console.log(`?name=${history.location.search}`)}
              {console.log(`?name=${item.name}`)}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
