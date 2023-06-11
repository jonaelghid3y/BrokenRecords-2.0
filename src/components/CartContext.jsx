import React, { createContext, useState } from 'react';

export const CartContext = createContext();
const CartContextProvider = (props) => {
  
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(p => p._id === product._id);
    if (existingProductIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(product => product._id === productId);
    updatedCart.splice(productIndex, 1);
    setCart(updatedCart);
  };
  const removeProduct = (productId) => {
    const updatedCart = cart.filter((product) => product._id !== productId);
    setCart(updatedCart);
  }

  function addProduct(productId) {
    const updatedCart = cart.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          quantity: product.quantity + 1
        };
      } else {
        return product;
      }
    });


    setCart(updatedCart);
  }

  function reduceProduct(productId) {
    const updatedCart = cart.map((product) => {
      if (product._id === productId && product.quantity > 0) {
        return {
          ...product,
          quantity: product.quantity - 1
        };
      } else {
        return product;
      }
    });

    const updatedCartWithoutZeroQuantity = updatedCart.filter((product) => product.quantity > 0);
    setCart(updatedCartWithoutZeroQuantity);
    
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addProduct, addToCart, removeProduct, reduceProduct, removeFromCart }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;