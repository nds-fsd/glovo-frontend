import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [completedCart, setCompletedCart] = useState([]);
  const addToCart = (dish) => {
    const check = completedCart.filter((dishCart) => {
      return dishCart.id === dish.id;
    });
    if (check.length === 0) {
      setCompletedCart([...completedCart, dish]);
      return;
    }
    if (check.length > 0) {
      const newCheck = completedCart.filter((cartDish) => {
        return cartDish.id !== dish.id;
      });
      setCompletedCart([...newCheck, dish]);
    }
  };
  const value = {
    addToCart,
    completedCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);
