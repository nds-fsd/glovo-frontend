import styles from './navBar.module.css';

export const NavBar = ({ children }) => (
  <div className={styles.container}>
    <h1>I am the CategoryNavbar </h1>
    {children}
  </div>
);