// Import necessary React hooks and components
import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Create a context for managing the cart state
const CartContext = createContext();

// Define the cart reducer function, which specifies how the cart state should change based on actions
// Reducer function to manage the cart state based on different actions
const cartReducer = (state, action) => {
  switch (action.type) {
    // When a new item is added to the cart
    case 'ADD_TO_CART':
      // Check if the item is already in the cart
      const existingItemIndex = state.findIndex(item => item.id === action.payload.id);

      // If the item is already in the cart
      if (existingItemIndex !== -1) {
        // Clone the current state to avoid direct mutation
        const updatedCart = [...state];
        // Increment the quantity of the existing item by 1
        updatedCart[existingItemIndex].quantity += 1;
        // Return the updated cart
        return updatedCart;
      } else {
        // If the item is not in the cart, add it with a quantity of 1
        return [...state, { ...action.payload, quantity: 1 }];
      }

    // When an item is removed from the cart
    case 'REMOVE_FROM_CART':
      // Filter out the item with the specified ID to remove it from the cart
      return state.filter(item => item.id !== action.payload);

    // When the quantity of an item in the cart is updated
    case 'UPDATE_QUANTITY':
      // Map through the cart items to update the quantity of the specified item
      const updatedCart = state.map(item =>
        item.id === action.payload.itemId
          // If the item ID matches, update the quantity based on the provided amount (can be positive or negative)
          ? { ...item, quantity: Math.max(1, item.quantity + action.payload.amount) }
          // If the item ID doesn't match, keep the item unchanged
          : item
      );
      // Return the updated cart
      return updatedCart;

    // Other cases for updating quantities, clearing cart, etc.
    default:
      // If the action type is not recognized, return the current state unchanged
      return state;
  }
};


// Create a CartProvider component to wrap the entire application with the cart context
export const CartProvider = ({ children }) => {
  // Retrieve the cart from local storage or initialize an empty array
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Use the useReducer hook to manage the cart state with the cartReducer function
  const [cart, dispatch] = useReducer(cartReducer, storedCart);

  // Use the useEffect hook to update local storage whenever the cart state changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Define functions to interact with the cart state and provide them in the context
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, amount) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, amount } });
  };

  // Provide the cart state and functions through the CartContext
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to easily access the cart context in components
export const useCart = () => {
  return useContext(CartContext);
};
