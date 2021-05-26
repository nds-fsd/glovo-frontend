/* eslint-disable react/no-array-index-key */
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { RESTAURANT_LIST_PAGE } from '../../router/router';
import styles from './categoryBar.module.css';

export const CategoryBar = ({ children }) => {
  const history = useHistory();
  return (
    <div className={styles.container}>
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
            </li>
          );
        })}
      </ul>
    </div>
  );
};
