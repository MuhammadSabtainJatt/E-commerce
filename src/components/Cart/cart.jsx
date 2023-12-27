import React from 'react';
import { useCart } from '../CartContext/cartcontext';
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { Image } from 'antd';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  // Function to handle removing an item from the cart
const handleRemoveFromCart = (itemId) => {
  // Call the removeFromCart function from the cart context to remove the item
  removeFromCart(itemId);
};

// Function to handle incrementing the quantity of an item in the cart
const handleIncrementQuantity = (itemId) => {
  // Call the updateQuantity function with an amount of 1 to increment the quantity
  updateQuantity(itemId, 1);
};

// Function to handle decrementing the quantity of an item in the cart
const handleDecrementQuantity = (itemId) => {
  // Call the updateQuantity function with an amount of -1 to decrement the quantity
  updateQuantity(itemId, -1);
};

// Function to calculate the total price of all items in the cart
const calculateTotalPrice = () => {
  // Use the reduce function to calculate the total price based on item price and quantity
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};


  return (
    <div>
      {cart.length === 0 ? (
        <div className="container d-flex align-items-center justify-content-center vh-100">
          <div className="row">
            <div className="col-12 col-md-6 text-center">
              <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="" className="img-fluid" />
            </div>
            <div className="col-12 col-md-6 text-center d-flex align-items-center justify-content-center flex-column">
              <h1>Your Cart is Empty ......</h1>
              <p>To add a product to the Cart, go to the product page and click on "Add to Cart".</p>
              <button className="btn btn-primary" onClick={() => navigate("/")}>Add Product</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <div>

                <h1 className='my-3 text-danger'>
                  <div className="btn btn-danger rounded-5 " onClick={()=>navigate("/")}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </div> Shopping Cart</h1>
                <div className='table-responsive'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Details</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <Image src={item.image} alt="" width={50} />
                          </td>
                          <td>
                            <h4>{item.title}</h4>
                            <p>Price: <strong className='text-danger '>${item.price}</strong></p>
                          </td>
                          <td>
                            <button className="btn " onClick={() => handleDecrementQuantity(item.id)}>-</button>
                            {item.quantity}
                            <button className="btn " onClick={() => handleIncrementQuantity(item.id)}>+</button>
                          </td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                          <td>
                            <button className="btn text-danger" onClick={() => handleRemoveFromCart(item.id)}><DeleteOutlined /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="cart-total">
                  <h4 className='text-danger mt-5'>Total Price: ${calculateTotalPrice()}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
