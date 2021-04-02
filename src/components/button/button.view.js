import styles from './button.module.css';

export const Button = ({ children }) => {
  return (
    <div className={styles.container}>
      <p className={styles.buttonText}>{children}</p>
    </div>
  );
};
