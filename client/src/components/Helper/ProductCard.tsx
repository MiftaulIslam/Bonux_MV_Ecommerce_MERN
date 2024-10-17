import { useState, useEffect, useCallback } from 'react'
import SearchIcon from '../../widgets/icons/SearchIcon'
import Cart from '../../widgets/icons/Cart'
import { StarRating } from '../../widgets'
import QuickViewModal from './QuickViewModal'
import React from 'react'

const ProductCard:React.FC<any> = ({product}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const [toggleQuickView, settoggleQuickView] = useState(false)
  const [selectedProduct, setselectedProduct] = useState(false)
  const changeImage = useCallback((index:number) => {
    setCurrentImageIndex(index)
  }, [])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length)
    }, 10000) // Change image every 3 seconds

    return () => clearInterval(intervalId)
  }, [product.images.length])

  return (
    <div 
      className="relative cursor-pointer h-[23rem] bg-white p-2 shadow-md rounded-lg overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    {toggleQuickView && selectedProduct && <QuickViewModal data={selectedProduct} onClose={()=> settoggleQuickView(false)}/>}
      {/* Product Image Carousel */}
      <div className="relative h-44 w-full">
        {product.images.map((img:any, index:number) => (
          <img 
            key={index}
            src={img}
            alt={`${product.title} - Image ${index + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        {/* Clickable Carousel Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {isHovered && product.images.map((_:any, index:number) => (
            <button
              key={index}
              onClick={() => changeImage(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300 hover:bg-blue-300'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      {/* Product Details */}
      <div className="p-4">
        {/* Product title */}
        <h2 className="text-base text-gray-800 font-semibold mb-2">
          {product.title.length > 80 ? `${product.title.slice(0,50)}...` : product.title}
        </h2>
        {/* Description */}
        <p className='text-xs mb-2 text-gray-500'>
          {product.description.length > 80 ? `${product.description.slice(0,70)}...` : product.description}
        </p>
        {/* Pricing Section */}
        <p className="text-blue-400 font-bold font-sm mb-2">
          ${(product.price - ((product.discountPercentage / 100)*product.price)).toFixed(2)}
          <span className="text-xs line-through text-gray-400 ml-1">
            ${product.price.toFixed(2)}
          </span>
          <span className='text-xs ml-1 text-blue-500'>-{product.discountPercentage}%</span>
        </p>
        {/* Rating & Review */}
        <div className="flex items-end">
          <StarRating rating={product?.rating} />
          <span className='text-xs mr-1 text-gray-400'>{product?.rating.toFixed(1)} </span>
          <span className='text-xs text-gray-400'>({product?.reviews.length})</span>
        </div>
      </div>
      {/* Hover Icons */}
      <div 
        className={`absolute right-2 top-2 bg-white text-blue-500 flex flex-col gap-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button type='button' className="p-2 duration-200 border w-10 h-10 rounded-full shadow-md hover:bg-gray-100"
        onClick={()=>{settoggleQuickView(true); setselectedProduct(product)}}
        >
          <SearchIcon />
        </button>
        <button type='button' className="p-2 duration-200 border w-10 h-10 rounded-full shadow-md hover:bg-gray-100">
          <Cart color={'#3b82f6'} width={20} height={20} />
        </button>
      </div>
    </div>
  )
}

export default ProductCard
