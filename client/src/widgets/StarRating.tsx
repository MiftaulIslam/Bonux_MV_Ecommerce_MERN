import React, { useState } from 'react';

const StarRating = ({ rating, onChange, editable = false }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseEnter = (value) => {
    if (editable) {
      setHoveredRating(value);
    }
  };

  const handleMouseLeave = () => {
    if (editable) {
      setHoveredRating(0);
    }
  };

  const handleClick = (value) => {
    if (editable && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => {
        const isFull = rating >= value;
        const isHalf = rating >= value - 0.5 && rating < value;
        const isHovered = hoveredRating >= value;

        return (
          <div
            key={value}
            className="relative"
            onMouseEnter={() => handleMouseEnter(value)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(value)}
          >
            {/* Full Star or Partial Star */}
            <svg
              className={`w-5 h-5 text-yellow-400 ${editable ? 'cursor-pointer' : ''} ${isHovered &&  'text-yellow-400'}`}
              viewBox="0 0 20 20"
              fill={isFull ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="1"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            {/* Overlay a half-star if necessary */}
            {isHalf && (
              <svg
                className={`absolute top-0 left-0 w-5 h-5 text-yellow-400`}
                viewBox="0 0 20 20"
                fill="currentColor"
                style={{ clipPath: 'inset(0 50% 0 0)' }} // Clip to half the star
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
