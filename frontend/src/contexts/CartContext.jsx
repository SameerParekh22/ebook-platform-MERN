import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingBook = state.cart.find(book => book.id === action.payload.id);
      if (existingBook) {
        return {
          ...state,
          cart: state.cart.map(book =>
            book.id === action.payload.id
              ? { ...book, quantity: book.quantity + 1 }
              : book
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(book => book.id !== action.payload.id)
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(book =>
          book.id === action.payload.id
            ? { ...book, quantity: action.payload.quantity }
            : book
        )
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
