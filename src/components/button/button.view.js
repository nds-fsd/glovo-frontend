import styles from './button.module.css';

export const Button = ({ children, onClick, style }) => {
  return (
    <div className={`${styles._container} ${style}`} onClick={() => onClick()}>
      <p className={styles._buttonText}>{children}</p>
    </div>
  );
};
