import React from 'react';
import { useCart } from '../CartContext/cartcontext';

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div>
                <h4>{item.title}</h4>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-total">
            <p>Total Price: ${calculateTotalPrice()}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
