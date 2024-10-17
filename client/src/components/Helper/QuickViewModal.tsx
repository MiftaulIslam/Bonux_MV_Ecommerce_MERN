import { useEffect, useState, useRef } from "react"
import { quickViewodalProp } from "../../models/PropType"
import { StarRating } from "../../widgets"
import Subtract from "../../widgets/icons/Subtract"
import Plus from "../../widgets/icons/Plus"
import Cart from "../../widgets/icons/Cart"

const QuickViewModal:React.FC<quickViewodalProp> = ({ data, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [magnifyStyle, setMagnifyStyle] = useState({})
  const imageRef = useRef<any>(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % data.images.length)
    }, 20000)

    return () => clearInterval(timer)
  }, [data.images.length])

  const handleAddToCart = () => {
    // Implement add to cart functionality
    console.log("Added to cart:", data.id, "Quantity:", quantity)
  }

  const incrementQuantity = () => setQuantity((q) => q + 1)
  const decrementQuantity = () => setQuantity((q) => Math.max(1, q - 1))

  const discountedPrice =(data.price -  ((data.discountPercentage / 100)*data.price)) * quantity

  const handleMouseMove = (e:any) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      setMagnifyStyle({
        display: "block",
        backgroundImage: `url(${data.images[currentImageIndex]})`,
        backgroundPosition: `${x}% ${y}%`,
      })
    }
  }

  const handleMouseLeave = () => {
    setMagnifyStyle({ display: "none" })
  }

  return (
    <div className="fixed overflow-y-auto inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

      <div className="bg-white rounded-lg max-w-4xl w-full min-h-[47vh] sm:max-h-[90vh] overflow-y-auto">

        <div className="px-6 py-2">
          {/* Close button */}
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-3xl text-gray-500 hover:text-gray-700">
              x
            </button>
          </div>

          {/* Container */}
          <div className="flex flex-col space-y-20 sm:space-y-0 sm:gap-10 sm:flex-row space-x-6">
            <div className=" w-full sm:w-64 h-72  space-y-4">
              <div 
                className="relative shadow w-full h-full overflow-hidden rounded-lg aspect-w-2 aspect-h-2"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  ref={imageRef}
                  src={data.images[currentImageIndex]}
                  alt={`${data.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full cursor-pointer hover:cursor-zoom-in object-contain"
                />
                <div 
                  className="absolute inset-0 bg-no-repeat bg-cover pointer-events-none"
                  style={{
                    ...magnifyStyle,
                    backgroundSize: '200%',
                  }}
                />
              </div>
              <div className="flex justify-center space-x-2 overflow-x-auto">
                {data?.images.map((image:any, index:number) => (
                  <button
                  type="button"
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-12 h-12 border-2 rounded-md overflow-hidden flex-shrink-0 ${
                      index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${data.name} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-xl text-gray-700 font-bold">{data.title}</h2>
              <div className="flex items-center  space-x-1">
              <StarRating rating={data?.rating} />
          <span className='text-xs mr-1 text-gray-500'>{data?.rating.toFixed(1)} </span>
          <span className='text-xs text-gray-500'>({data?.reviews.length})</span>
        
              </div>
              <p className="text-sm text-gray-600">{data.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-base text-blue-600 font-semibold">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${(data.price * quantity).toFixed(2)}</span>
                <span className="text-sm text-blue-500">-{data.discountPercentage}%</span>
              </div>
              <div className="flex gap-6 flex-wrap">
                
              <div className="flex items-center flex-wrap space-x-2">
                <span className="text-sm text-gray-700 font-medium">Quantity:</span>
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8  flex items-center justify-center  rounded-full"
                ><Subtract width={20} height={20}/>
                </button>
                <span className="w-8 text-sm font-semibold text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 flex items-center justify-center  rounded-full"
                >
                  <Plus width={20} height={20}/>
                </button>
              </div>
              <div className="bg-blue-600 text-start  w-1/3 relative">
                <button
                type="button"
                  onClick={handleAddToCart}
                  className="text-start text-xs font-semibold px-2 w-full h-full text-white rounded-md hover:bg-blue-700  transition duration-300"
                >
                  Add to Cart
                </button>
                <span className="flex justify-center items-center w-[50px] h-full absolute top-0 right-0 bg-blue-700">
                  <Cart width={20} height={20} color={'#fff'}/>
                </span>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
