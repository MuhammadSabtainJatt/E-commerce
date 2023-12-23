import { Image, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RatingStars from '../Hero/RatingStars';
import {ShoppingCartOutlined  } from '@ant-design/icons';

const Detail = () => {
  const [data, setData] = useState([]);
  const param = useParams();

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

  const   handleAddCart=(name)=>{
    message.success(`${name} is Added to Cart`)
  }



console.log(data)
  return (
    <div className="container d-flex align-items-center justify-content-center " style={{minHeight:"100vh"}}>
      {data.map((item) => (
        <div key={item.id} className="row  p-4 rounded ">
          <div className="col-12 col-md-6 text-center">
            <Image style={{maxWidth:300}} src={item.image} />
          </div>
          <div className="col-12 col-md-6 m-auto">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <h4 className='text-danger'>$ {item.price}</h4>
            <div className="rating-stars">
              <RatingStars rating={item.rating.rate} />
            </div>
            <div className="btn btn-success mt-4" onClick={()=>handleAddCart(item.title)}>
              Add to Cart <ShoppingCartOutlined />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Detail;
