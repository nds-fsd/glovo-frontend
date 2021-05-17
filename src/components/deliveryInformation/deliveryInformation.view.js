/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-console */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './deliveryInformation.module.css';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import Button from '../button';
import { useCartContext } from '../../context/cartContext';
// import { Rating } from '../rating/rating.view';
import { getUserSession } from '../../assets/utils/localStorage.utils';
import { shortFetch } from '../../assets/utils/fetch.utils';

const DeliveryInformation = ({ selectedResto }) => {
  const { completedCart, addToCart, removeItemInCart, setCompletedCart } = useCartContext();
  let totalPrice = 0;

  const payOrder = () => {
    const userId = getUserSession().id;
    if (!userId) {
      return null;
    }
    const orderList = completedCart?.map((cart) => {
      return { Dish: cart.id, qty: cart.quantity };
    });
    const idResto = completedCart[0].restoId;
    shortFetch({
      url: '/orders',
      method: 'POST',
      token: true,
      body: {
        User: userId,
        Restaurant: idResto,
        orderList,
        total: totalPrice,
      },
      onSuccess: () => setCompletedCart([]),
    });
    return true;
  };

  return (
    <div className={styles._cardContainer}>
      <h1>Your Glovo</h1>
      <div className={styles._restoFeatures}>
        <div className={styles._allIconsFeatures}>
          <FontAwesomeIcon icon="clock" className={styles._iconsFeatures} />
          <FontAwesomeIcon icon="coins" className={styles._iconsFeatures} />
          <FontAwesomeIcon icon="bicycle" className={styles._iconsFeatures} />
        </div>
        {selectedResto && (
          <div className={styles._allFeatures}>
            <p style={{ margin: '0' }}>{selectedResto.deliveryTime}</p>
            <p style={{ margin: '0' }}>{selectedResto.priceRating}</p>
            <p style={{ margin: '0' }}>{selectedResto.deliveryCost}</p>
          </div>
        )}
      </div>
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
                        restoId: cart.Restaurant,
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
          <Button onClick={() => payOrder()} buttonStyle="payOrder">
            PAY
          </Button>
        </div>
      )}
    </div>
  );
};

export default DeliveryInformation;
