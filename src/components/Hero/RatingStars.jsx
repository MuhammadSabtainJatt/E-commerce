// RatingStars.js
import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  return (
    <div>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;

        return (
          <FaStar
            key={index}
            color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
            size={15}
          />
        );
      })}
    </div>
  );
};

export default RatingStars;
