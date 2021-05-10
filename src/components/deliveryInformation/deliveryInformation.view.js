/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import styles from './deliveryInformation.module.css';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import Button from '../button';

const DeliveryInformation = ({ completedCart, modalDishView }) => {
  let totalPrice = 0;

  const onClick = () => {
    console.log('hola');
  };
  return (
    <div className={styles._cardContainer}>
      <h1>Your Glovo</h1>
      <div className={styles._restoFeatures}></div>
      <div className={styles._cart}>
        {completedCart &&
          completedCart.map((cart) => {
            if (cart.price) {
              const subTotal = Number(cart.price) * Number(cart.quantity);
              totalPrice += subTotal;
            }
            return (
              <div className={styles._newOrder}>
                <p style={{ fontWeight: 'bold' }}>{cart.quantity && `${cart.quantity}x`}</p>
                <p>{capitalize(cart.dish)}</p>
                <p>{cart.quantity && formatNumber(Number(cart.price) * Number(cart.quantity))}</p>
              </div>
            );
          })}
      </div>
      {completedCart.length >= 1 && (
        <div>
          <p>TOTAL: {formatNumber(totalPrice)}</p>
          <Button onClick={() => onClick()} buttonStyle="payOrder">
            PAY
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryInformation;
