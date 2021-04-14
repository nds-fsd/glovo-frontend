import styles from './button.module.css';

export const Button = ({ children, onClose, style }) => {
  return (
    <div className={`${styles._container} ${style}`} onClick={onClose}>
      <p className={styles._buttonText}>{children}</p>
    </div>
  );
};
