/* eslint-disable react/no-array-index-key */

import styles from './navBar.module.css';

export const Navbar = ({ children }) => (
  <div className={styles.container}>
    <ul className={styles.listContainer}>
      {children.map((item, index) => {
        return (
          <li key={index} className={styles.restaurantItem}>
            {item}
          </li>
        );
      })}
    </ul>
  </div>
);
