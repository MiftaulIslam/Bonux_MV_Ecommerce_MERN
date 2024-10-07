import React, { useState, useRef, useEffect } from 'react';
import { carouselProp } from '../models/PropType';

const Carousel:React.FC<carouselProp> = ({ children, autoplayInterval=5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const movePrev = () => {
    setCurrentIndex((currentIndex - 1 + React.Children.count(children)) % React.Children.count(children));
  };
  
  const moveNext = () => {
    setCurrentIndex((currentIndex + 1) % React.Children.count(children));
  };
  const handlePaginationClick = (index:any) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const autoplayIntervalId = setInterval(() => {
      moveNext();
    }, autoplayInterval);

    return () => {
      clearInterval(autoplayIntervalId);
    };
  }, [autoplayInterval, currentIndex]);
  return (
    <div className="carousel overflow-hidden w-full h-full relative">
      <div className="flex justify-between  items-center absolute top left w-full h-full">
        <button
        type='button'
          onClick={movePrev}
          className="bg-[#686D76] text-white w-6 h-[50px]  opacity-50 hover:opacity-75 disabled:cursor-not-allowed p-0 m-0 transition-all ease-in-out duration-300"
          
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-7 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span className="sr-only">Prev</span>
        </button>
        <button
        type='button'
          onClick={moveNext}
           className="bg-[#686D76] text-white w-6 h-[50px]  opacity-50 hover:opacity-75 disabled:cursor-not-allowed  p-0 m-0 transition-all ease-in-out duration-300"
         
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
               className="h-12 w-7 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>

      <div
        ref={carouselRef}
        className="carousel-container flex w-full h-full overflow-hidden snap-x"
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            style={{transform:`translateX(-${currentIndex * 100}%)`}}
            className={`carousel-item -z-10 transition-transform  ease-out duration-500 w-full h-full flex-shrink-0 ${
              index === currentIndex ? 'active' : ''
            }`}
          >
            {child}
          </div>
        ))}
      </div>

      <div className="pagination gap-1 absolute bottom-0 left-0 w-full flex justify-center mb-4">
        {React.Children.map(children, (_child, index) => (
          <button
          type='button'
            key={index}
            onClick={() => handlePaginationClick(index)}
            className={` w-10 h-1 rounded-full bg-gray-300 hover:bg-gray-500 transition-all ease-in-out duration-300 ${
              index === currentIndex ? 'bg-gray-500' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;