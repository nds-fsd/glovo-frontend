/* eslint-disable react/no-array-index-key */

import styles from './navBar.module.css';

export const Navbar = ({ children }) => (
  <div className={styles.container}>
    <ul className={styles.listContainer}>
      {children.map((item) => {
        return (
          <li key={item._id} className={styles.restaurantItem}>
            {item.name}
          </li>
        );
      })}
    </ul>
  </div>
);
