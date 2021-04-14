/* eslint-disable no-console */
/* eslint-disable react/no-array-index-key */
import { useContext } from 'react';
import { RestoListContext } from '../context/restoListPageContext';
import styles from './navBar.module.css';

export const Navbar = ({ children }) => {
  const { setCategorySelected, categorySelected } = useContext(RestoListContext);
  return (
    <div className={styles.container}>
      <ul className={styles.listContainer}>
        {children.map((item) => {
          return (
            <li
              key={item._id}
              className={styles.restaurantItem}
              onClick={(e) => setCategorySelected(e.target.id)}
              id={item._id}
            >
              {item.name}
            </li>
          );
        })}
      </ul>
      {console.log(categorySelected)}
    </div>
  );
};
