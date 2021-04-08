import styles from './button.module.css';

export const Button = ({ children, onClose }) => {
  return (
    <div className={styles._container} onClick={onClose}>
      <p className={styles._buttonText}>{children}</p>
    </div>
  );
};
