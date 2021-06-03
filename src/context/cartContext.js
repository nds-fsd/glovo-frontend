/* eslint-disable no-console */
import { createContext, useContext, useState } from 'react';
// import { getStorageObject } from '../assets/utils/localStorage.utils';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [completedCart, setCompletedCart] = useState([]);
  const [modalDishView, setModalDishView] = useState({});
  console.log(completedCart);

  const addToCart = (dish) => {
    const isExist = completedCart.some((dishCart) => dishCart.id === dish.id);

    if (!isExist) {
      setCompletedCart([...completedCart, { ...dish, quantity: 1 }]);
    } else {
      const dishCart = completedCart.find((d) => d.id === dish.id);
      const { quantity } = dishCart;
      const clearCompleteCart = completedCart.filter((item) => item.id !== dish.id);
      setCompletedCart([...clearCompleteCart, { ...dish, quantity: quantity + 1 }]);
    }
  };
  const viewDishInModal = (dish) => {
    if (dish) {
      setModalDishView({ ...dish, modalDishView });
    }
  };

  const removeItemInCart = (dishID) => {
    setCompletedCart((prev) => {
      const foundItem = prev.find((i) => i.id === dishID.id);
      if (foundItem) {
        if (foundItem.quantity === 1) {
          const newArray = prev.filter((i) => i.id !== dishID.id);
          return newArray;
        }
        return prev.map((i) => (i.id === dishID.id ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev;
    });
  };
  const value = {
    addToCart,
    completedCart,
    setCompletedCart,
    viewDishInModal,
    modalDishView,
    removeItemInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
