import React, {createContext, useReducer} from 'react';
import cartReducer, { sumItems } from './CartReducer';

export const CartContext = createContext();


const cartFromStorage = localStorage.getItem('cart') 
 ? (JSON.parse(localStorage.getItem('cart')))
 : [];

const initialState = { 
 cartItems: cartFromStorage,
  ...sumItems(cartFromStorage) 
 };

const CartContextProvider = ({children}) => {
 const [state, dispatch] = useReducer(cartReducer, initialState);
 const addToCart = (product) => (
  dispatch({type: "ADD_TO_CART", payload: product})
  )
  const setQuantity = (product, num) => dispatch({type: "SETQTY", payload:{product, num}})
  
  const removeProduct = (product) => dispatch({type: "REMOVE", payload: product});

  const clear = (cartItems)=> dispatch({type:"CLEAR", payload: cartItems})

 const contextValues = { 
  ...state, 
  addToCart,
  setQuantity,
  removeProduct,
  clear
 }

 return (
  <CartContext.Provider value = { contextValues }>
   {
    children
   }
  </CartContext.Provider>
 )
}

export default CartContextProvider;