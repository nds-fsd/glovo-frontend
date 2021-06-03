/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useHistory } from 'react-router-dom';
import styles from './deliveryInformation.module.css';
import { capitalize } from '../../assets/utils/capitalLetter';
import { formatNumber } from '../../assets/utils/convertToCurrency';
import Button from '../button';
import { useCartContext } from '../../context/cartContext';
import {
  getUserSession,
  setStorageObject,
  getStorageObject,
} from '../../assets/utils/localStorage.utils';
import { shortFetch } from '../../assets/utils/fetch.utils';
import Modal from '../modal/modal.view';
import imgProcessing from '../../assets/images/image_processing20191001-8524-s4802o.gif';
import { RESTAURANT_LIST_PAGE } from '../../router/router';

const DeliveryInformation = ({ selectedResto, showIcons }) => {
  const localStorageShopCart = getStorageObject('shoppingCart');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { completedCart, addToCart, removeItemInCart, setCompletedCart } = useCartContext();
  const history = useHistory();
  let totalPrice = 0;

  useEffect(() => {
    setStorageObject('shoppingCart', completedCart);
  }, [completedCart]);

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
      onSuccess: () => {
        setIsOpenModal(true);
        setCompletedCart([]);
      },
    });
    return true;
  };

  const handleClick = () => {
    history.push('/');
  };

  console.debug(completedCart);
  return (
    <div className={styles._cardContainer}>
      <h1>Your Glovo</h1>
      <div className={styles._restoFeatures}>
        {showIcons && (
          <div className={styles._allIconsFeatures}>
            <FontAwesomeIcon icon="clock" className={styles._iconsFeatures} />
            <FontAwesomeIcon icon="coins" className={styles._iconsFeatures} />
            <FontAwesomeIcon icon="bicycle" className={styles._iconsFeatures} />
          </div>
        )}
        {selectedResto && (
          <div className={styles._allFeatures}>
            <p style={{ margin: '0' }}>{selectedResto.deliveryTime}</p>
            <p style={{ margin: '0' }}>{selectedResto.priceRating}</p>
            <p style={{ margin: '0' }}>{formatNumber(Number(selectedResto.deliveryCost))}</p>
          </div>
        )}
      </div>
      <div className={classnames([styles._cart], { [styles._bgCart]: completedCart.length === 0 })}>
        {completedCart &&
          completedCart.map((cart) => {
            if (cart.price) {
              const subTotal = Number(cart.price) * Number(cart.quantity);
              totalPrice += subTotal;
            }
            return (
              <>
                <div className={styles._newOrderInfo}>
                  <div className={styles._qctName}>{cart.quantity && `${cart.quantity}x`}</div>
                  <div className={styles._dishName}>{capitalize(cart.dish)}</div>
                  <div className={styles._price}>
                    {cart.quantity && formatNumber(Number(cart.price) * Number(cart.quantity))}
                  </div>
                </div>
                <div className={styles.quantity}>
                  <FontAwesomeIcon
                    className={styles._newOrderIcons}
                    icon="minus-circle"
                    onClick={() => {
                      removeItemInCart({ id: cart.id });
                    }}
                  />
                  <FontAwesomeIcon
                    className={styles._newOrderIcons}
                    icon="plus-circle"
                    onClick={() => {
                      addToCart({
                        restoId: cart.restoId,
                        dish: cart.dish,
                        price: cart.price,
                        id: cart.id,
                      });
                    }}
                  />
                </div>
              </>
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
      <Modal onClose={() => setIsOpenModal(false)} open={isOpenModal} title="Thank You">
        <h3>¡We are preparing your order!</h3>
        <div className={styles._orderPreparing}>
          <img src={imgProcessing} alt="order" className={styles._imgPreparing}></img>
        </div>

        <Button onClick={() => handleClick()} buttonStyle="payOrder">
          Go to homepage
        </Button>
        {console.log('localStorageCart', localStorageShopCart)}
      </Modal>
    </div>
  );
};

export default DeliveryInformation;
