/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import classnames from 'classnames';
import { useContext } from 'react';
import { RestoListContext } from '../context/restoListPageContext';
import styles from './categoryBar.module.css';

export const CategoryBar = ({ children }) => {
  const { setCategorySelected, categorySelected } = useContext(RestoListContext);
  return (
    <div className={styles.container}>
      <ul className={styles.listContainer}>
        {children.map((item) => {
          return (
            <li
              key={item._id}
              className={classnames(styles.restaurantItem, {
                [styles.selected]: categorySelected === item._id,
              })}
              onClick={(e) => setCategorySelected(e.target.id)}
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
