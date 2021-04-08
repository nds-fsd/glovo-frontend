import styles from './button.module.css';

export const Button = ({ children, onClick }) => {
  return (
    <div className={styles._container} onClick={onClick}>
      <p className={styles._buttonText}>{children}</p>
    </div>
  );
};
