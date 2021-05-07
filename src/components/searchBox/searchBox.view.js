import styles from './searchBox.module.css';

export const SearchBox = () => {
  return (
    <div className={styles.container}>
      <input type="text" placeholder="Search" />
    </div>
  );
};
