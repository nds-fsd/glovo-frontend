import styles from './deliveryInformation.module.css';

const DeliveryInformation = () => {
  return (
    <div className={styles._cardContainer}>
      <h1>Your Glovo</h1>
      <div className={styles._restoFeatures}></div>
      <div className={styles._cart}></div>
    </div>
  );
};

export default DeliveryInformation;
