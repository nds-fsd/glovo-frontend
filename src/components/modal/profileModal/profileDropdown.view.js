import styles from './profileDropdown.module.css';

export const ProfileDropdown = ({ handleCloseModal, children }) => {
  return (
    <div>
      <div className={styles._overlay} onClick={handleCloseModal}></div>
      <div className={styles._container}>{children}</div>
    </div>
  );
};
