import styles from './navbar.module.css';

export const Navbar = ({ children }) => (
  <div className={styles.container}>
    <h1>I am the CategoryNavbar </h1>
    {children}
  </div>
);
