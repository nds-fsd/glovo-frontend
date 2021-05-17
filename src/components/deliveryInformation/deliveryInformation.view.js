/* eslint-disable no-console */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './deliveryInformation.module.css';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import Button from '../button';
import { useCartContext } from '../../context/cartContext';

const DeliveryInformation = () => {
  const { completedCart, addToCart, removeItemInCart } = useCartContext();
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
                <div className={styles._newOrderInfo}>
                  <p style={{ fontWeight: 'bold' }}>{cart.quantity && `${cart.quantity}x`}</p>
                  <p>{capitalize(cart.dish)}</p>
                  <p>{cart.quantity && formatNumber(Number(cart.price) * Number(cart.quantity))}</p>
                </div>
                <div className={styles._newOrderIcons}>
                  <FontAwesomeIcon
                    icon="minus-circle"
                    onClick={() => {
                      removeItemInCart({ id: cart.id });
                    }}
                  />
                  <FontAwesomeIcon
                    icon="plus-circle"
                    onClick={() => {
                      addToCart({
                        dish: cart.dish,
                        price: cart.price,
                        id: cart.id,
                      });
                    }}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {completedCart.length >= 1 && (
        <div className={styles._cartFooter}>
          <p className={styles._totalPrice}>
            TOTAL to pay <span>{formatNumber(totalPrice)}</span>
          </p>
          <Button onClick={() => onClick()} buttonStyle="payOrder">
            PAY
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryInformation;
