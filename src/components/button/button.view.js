import styles from './button.module.css';

export const Button = ({ buttonText, onClick, style }) => {
  return (
    <div className={`${styles._container} ${style}`} onClick={() => onClick()}>
      <p className={styles._buttonText}>{buttonText}</p>
    </div>
  );
};
