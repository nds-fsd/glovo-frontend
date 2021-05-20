import styles from './profileModal.module.css';

export const ProfileModal = ({ handleCloseModal, children }) => {
  return (
    <div>
      <div className={styles._overlay} onClick={handleCloseModal}></div>
      <div className={styles._container}>{children}</div>
    </div>
  );
};
