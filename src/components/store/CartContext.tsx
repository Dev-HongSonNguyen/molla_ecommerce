import React from "react";
import { createContext, useContext, useState } from "react";
const CartContext = createContext({});
export function useCartContext() {
  return useContext(CartContext);
}
export function CartProvider({ children }: any) {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  return (
    <CartContext.Provider
      value={{ cart, setCart, totalAmount, setTotalAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}
