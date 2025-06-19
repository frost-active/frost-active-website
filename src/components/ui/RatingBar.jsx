
import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react'; // or use custom SVG if you prefer

const RatingBar = ({ rating = 0, size = 'medium' }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const totalStars = 5;

  const starSize = size === 'small' ? 16 : size === 'large' ? 32 : 24;

  return (
    <div className="flex space-x-1">
      {[...Array(totalStars)].map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={starSize} className="text-yellow-500 fill-yellow-500" />;
        } else if (i === fullStars && halfStar) {
          return <StarHalf key={i} size={starSize} className="text-yellow-500 fill-yellow-500" />;
        } else {
          return <StarOff key={i} size={starSize} className="text-gray-300" />;
        }
      })}
    </div>
  );
};

export default RatingBar;
