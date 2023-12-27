import { Image, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext/cartcontext';
import { useNavigate, useParams } from 'react-router-dom';
import RatingStars from '../Hero/RatingStars';
import { ShoppingCartOutlined } from '@ant-design/icons';

const Detail = () => {
  const [data, setData] = useState([]);
  const param = useParams();
const Navigate = useNavigate()
  const { addToCart,cart } = useCart();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => res.json())
      .then((data) => {
        // Filter items based on the id
        // Use == because the param.id is a string and item id is a number
        const filteredData = data.filter((item) => item.id == param.id);
        setData(filteredData);
      })
      .catch((error) => {
        console.log(error);
        message.error('Something went wrong while fetching items');
      });
  }, [param.id]);
// Function to handle adding a product to the cart
const handleAddCart = (product) => {
  // Check if the item is already in the cart
  const isItemInCart = cart.some((item) => item.id === product.id);

  // If the item is already in the cart, show a warning message
  if (isItemInCart) {
    message.warning(`${product.title} is already in the Cart`);
  } else {
    // If the item is not in the cart, add it to the cart and show a success message
    addToCart(product);
    message.success(`${product.title} is added to Cart`);
  }

  // Navigate to the home page ("/") after handling the cart action
  Navigate("/");
};


  return (
    <div className="container d-flex align-items-center justify-content-center " style={{ minHeight: "100vh" }}>
      {data.length > 0 && data.map((item) => (
        <div key={item.id} className="row p-4 rounded ">
          <div className="col-12 col-md-6 text-center">
            <Image style={{ maxWidth: 300 }} src={item.image} />
          </div>
          <div className="col-12 col-md-6 m-auto">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <h4 className='text-danger'>$ {item.price}</h4>
            <div className="rating-stars">
              <RatingStars rating={item.rating.rate} />
            </div>
            <div className="btn btn-success mt-4" onClick={() => handleAddCart(item)}>
              Add to Cart <ShoppingCartOutlined />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Detail;
