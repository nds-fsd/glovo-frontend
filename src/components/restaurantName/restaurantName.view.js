import styles from './restaurantName.module.css';

export const RestaurantName = () => {
  return (
    <div className={styles.container}>
      <p className={styles.restaurantName}>Restaurant Name</p>
    </div>
  );
};
