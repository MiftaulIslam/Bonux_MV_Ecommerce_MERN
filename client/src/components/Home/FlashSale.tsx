import React, { useState } from 'react'
import { Cart } from '../../widgets/icons'

const FlashSale = () => {
  const [quickDemo, setquickDemo] = useState(0)
  const flashSaleProducts = [
    {
      id: 1,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 14523,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 14325432,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 1434535,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 145366398732,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 14132134345637,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 2,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 3,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 4,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 5,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 6,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 7,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 8,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 9,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 10,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 11,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 12,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 13,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 14,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 15,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 16,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 17,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 18,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 19,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
    {
      id: 20,
      name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
      price: 79.99,
      discount_percentage: 10,
      originalPrice: 129.99,
      image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
    },
  ]

  
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800">Flash Sale</h2>
    <div className="flex justify-between items-center mb-2">
      <h4 className='text-base font-bold text-blue-800'>On sale now</h4>
      <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
        See more
        {/* <ArrowRightIcon className="ml-2 h-5 w-5" /> */}
      </button>
    </div>
    <hr />
    <div className="grid py-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {flashSaleProducts.slice(0,5).map((product) => (
        <div
          key={product.id}
          className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg hover:translate-y-1 transition-transform duration-200"
          onMouseEnter={() => setquickDemo(product.id)}
          onMouseLeave={() => setquickDemo(0)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-36 object-cover"
          />
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              {product.name.length > 80 ? `${product.name.slice(0,50)}...` : product.name}
            </h3>
            <div className="mb-4">
              <p className="text-base font-bold text-red-600">${product.price.toFixed(2)}</p>
              <p>
                <span className="text-xs line-through text-gray-500">
                  ${product.originalPrice.toFixed(2)}
                </span>
                <span className='text-xs ml-1'>-{product.discount_percentage}%</span>
              </p>
            </div>
        <div className='flex  justify-between'>

        <button
        
            type='button'
                className={` bg-white px-3 rounded  hover:shadow-sm hover:border transition-opacity duration-300 ${quickDemo === product.id ? 'opacity-100' : 'opacity-0'}`}
              > 
                <Cart width={"1.3rem"} height={"1.3rem"} color={"#0C4A6E"}/>
              </button>
            <button
            type='button'
                className={` bg-white text-[#0C4A6E] text-xs sm:text-sm font-bold hover:shadow-md hover:border py-2 px-4 rounded  transition-opacity duration-300 ${quickDemo === product.id ? 'opacity-100' : 'opacity-0'}`}
              >
                Quick view
              </button>
        </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  )
}

export default FlashSale