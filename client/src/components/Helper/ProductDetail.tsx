import React, { useState, useEffect, useRef } from 'react'
import { StarRating } from '../../widgets'

const dummyProduct = {
  name: "Smartphone X",
  images: ["https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg", "https://th.bing.com/th/id/R.5e61e51fdf82c2bff8dbf92d1b824246?rik=EhhH7pniCl08hA&pid=ImgRaw&r=0", "https://mobilepriceall.com/wp-content/uploads/2022/09/Apple-iPhone-14-Pro-Max.jpg","https://th.bing.com/th/id/R.da8dc52419e9ea6dec6d2323f811ebd7?rik=Rxm840zSwRSmlQ&pid=ImgRaw&r=0"],
  vendor: {
    name: "TechCo",
    image: "https://s3-eu-west-1.amazonaws.com/tpd/logos/4f383288000064000512d5ba/0x0.png",
  },
  rating: 4.5,
  reviews: 120,
  description: "Experience the future of mobile technology with Smartphone X. Featuring a stunning display, powerful processor, and advanced camera system.",
  price: 599.99,
  originalPrice: 699.99,
  discountPercentage: 14,
  specifications: {
    "Key Featuhrfgsgyfuyufygfygyhfyhfyhfdyridfhiruyzhyhfdrbnzyhfdrzyfrdhzyfrdhznbgfryzhres": [
      "Model: 40 SE",
      "Display: 6.75\" HD+, Mini-Notch, 90hz Display",
      "Processor: MediaTek Helio G37 (12nm)",
      "Camera: Triple 50+2+2 MP on Rear, 8MP Selfie",
      "Features: Side Fingerprint, 18W Fast Charging",
    ],
    "Display": [
      "Size: 6.75 Inch",
      "Type: IPS LCD",
      "Resolution: HD+ (720x1600 pixels) 260PPI",
      "Refresh Rate: 90Hz",
      "Brightness: 450 nits (Typ.)",
    ],
    "adwdwdad": [
      "Size: 6.75 Inch",
      "Type: IPS LCD",
      "Resolution: HD+ (720x1600 pixels) 260PPI",
      "Refresh Rate: 90Hz",
      "Brightness: 450 nits (Typ.)",
    ],
    "Diswadadssplay": [
      "Size: 6.75 Inch",
      "Type: IPS LCD",
      "Resolution: HD+ (720x1600 pixels) 260PPI",
      "Refresh Rate: 90Hz",
      "Brightness: 450 nits (Typ.)",
    ],
    "wadadasd": [
      "Size: 6.75 Inch",
      "Type: IPS LCD",
      "Resolution: HD+ (720x1600 pixels) 260PPI",
      "Refresh Rate: 90Hz",
      "Brightness: 450 nits (Typ.)",
    ],
  },
  relatedProducts: [
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
    { name: "Smartphone Y", price: 499.99, image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore" },
  ],
}

export default function ProductDetail() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [magnifyStyle, setMagnifyStyle] = useState({})
  const imageRef = useRef(null)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveImageIndex((prevIndex) => (prevIndex + 1) % dummyProduct.images.length)
//     }, 20000)
//     return () => clearInterval(interval)
//   }, [])

  const handleMouseMove = (e) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100
      setMagnifyStyle({
        display:"block",
        backgroundImage: `url(${dummyProduct.images[activeImageIndex]})`,
        backgroundPosition: `${x}% ${y}%`,
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Images */}
        <div className="md:w-1/2">
          <div 
            className="relative w-full h-96 overflow-hidden rounded-lg mb-4 cursor-zoom-in"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMagnifyStyle({})}
          >
            <img
              ref={imageRef}
              src={dummyProduct.images[activeImageIndex]}
              alt={dummyProduct.name}
              className="w-full h-full object-cover"
            />
          <div 
                  className="absolute inset-0 bg-no-repeat bg-auto pointer-events-none"
                  style={{
                    ...magnifyStyle,
                    backgroundSize: '125%',
                  }}
                />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {dummyProduct.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${dummyProduct.name} ${index + 1}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                  index === activeImageIndex ? 'border-2 border-blue-500' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Right side - Product details */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{dummyProduct.name}</h1>
          <div className="flex items-center gap-4 mb-4">
            <img
              src={dummyProduct.vendor.image}
              alt={dummyProduct.vendor.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{dummyProduct.vendor.name}</span>
          </div>
          <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={dummyProduct.rating} />
            <span>{dummyProduct.rating.toFixed(1)}</span>
            <span>({dummyProduct.reviews} reviews)</span>
          </div>
          </div>
          <p className="text-gray-600 mb-4">{dummyProduct.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold">${dummyProduct.price.toFixed(2)}</span>
            <span className="text-xl text-gray-500 line-through">
              ${dummyProduct.originalPrice.toFixed(2)}
            </span>
            <span className="text-green-500">
              {dummyProduct.discountPercentage}% OFF
            </span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <label htmlFor="quantity" className="font-semibold">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="border rounded px-2 py-1 w-16"
            />
          </div>
          <div className="flex gap-4 mb-8">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Add to Cart
            </button>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {Object.entries(dummyProduct.specifications).map(([category, specs]) => (
          <div key={category} className="mb-6 text-wrap break-all">
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <ul className="">
              {specs.map((spec, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
      
      </div>

      {/* You may also like */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {dummyProduct.relatedProducts.map((product, index) => (
            <div key={index} className="border rounded-lg p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold mb-2">{product.name}</h3>
              <p className="text-blue-500 font-bold">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}