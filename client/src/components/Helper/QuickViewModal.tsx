import { useEffect, useState, useRef } from "react"

const QuickViewModal = ({ data, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [magnifyStyle, setMagnifyStyle] = useState({})
  const imageRef = useRef(null)

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

  const handleMouseMove = (e) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full min-h-[50vh] sm:max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col  gap-32 sm:flex-row space-x-6">
            <div className=" w-full sm:w-64 h-80  space-y-4">
              <div 
                className="relative w-full h-full overflow-hidden rounded-lg aspect-w-2 aspect-h-2"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  ref={imageRef}
                  src={data.images[currentImageIndex]}
                  alt={`${data.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full cursor-pointer object-contain"
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
                {data?.images.map((image, index) => (
                  <button
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
              <h2 className="text-2xl font-bold">{data.title}</h2>
              {/* <div className="flex items-center space-x-2">
                <img src={data.vendor.image} alt={data.vendor.name} className="w-8 h-8 rounded-full" />
                <span className="text-sm text-gray-600">{data.vendor.name}</span>
              </div> */}
              <div className="flex items-center  space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < Math.floor(data.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-600">({data.reviews.length} reviews)</span>
              </div>
              <p className="text-sm text-gray-600">{data.description}</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">${discountedPrice.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through">${(data.price * quantity).toFixed(2)}</span>
                <span className="text-sm text-green-600">-{data.discountPercentage}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Quantity:</span>
                <button
                  onClick={decrementQuantity}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                >
                  +
                </button>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuickViewModal
