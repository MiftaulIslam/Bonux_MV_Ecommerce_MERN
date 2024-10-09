import React, { useState, useEffect, useRef } from 'react'
import { StarRating } from '../../widgets'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../../widgets/Loader'
import  Cart  from '../../widgets/icons/Cart'
import QuickViewModal from './QuickViewModal'

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
    "Key Features": [
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
  const {id}= useParams()
  const navigate = useNavigate()
  const [toggleQuickView, settoggleQuickView] = useState(false);
  const [selectedProduct, setselectedProduct] = useState(null);



  const [quickDemo, setquickDemo] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState<any>(null)
  const [products, setProducts] = useState<any>(null)
  const [magnifyStyle, setMagnifyStyle] = useState({})
  // const [reviews, setReviews] = useState(dummyReviews)
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' })
  const imageRef = useRef<HTMLImageElement | null>(null)
const fetchProduct =async  ()=>{
 const data = await fetch(`https://dummyjson.com/products/${id}`)
 const data2 = await fetch(`https://dummyjson.com/products/category/smartphones?limit=10&skip=10`)
 const jsonData = await data.json()
 const jsonData2 = await data2.json()
 setProduct(jsonData)
 setProducts(jsonData2.products)
 setLoading(false)
}
  useEffect(() => {
    fetchProduct()
    window.scrollTo(0, 0);
  }, [id])
console.log(product)
  const handleMouseMove = (e:React.MouseEvent) => {
    if (imageRef.current) {
      const { left, top, width, height } = imageRef.current.getBoundingClientRect()
      const x = ((e.pageX - left) / width) * 100
      const y = ((e.pageY - top) / height) * 100
      setMagnifyStyle({
        backgroundImage: `url(${product?.images[activeImageIndex]})`,
        backgroundPosition: `${x}% ${y}%`,
      })
    }
  }
  const handleBuyClick = () => {
    const formattedTitle = product.title.split(" ").join("-");
    
    navigate(`/checkout/${formattedTitle}/${product.id}?quantity=${quantity}`);
  };
  const handleReviewSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("review submmited")
    // const newReviewObj = {
    //   id: reviews.length + 1,
    //   user: "Anonymous",
    //   rating: newReview.rating,
    //   comment: newReview.comment,
    //   date: new Date().toISOString().split('T')[0]
    // }
    // setReviews([newReviewObj, ...reviews])
    // setNewReview({ rating: 0, comment: '' })
  }
if(loading) return <Loader/>

  return (
    <div className="container mx-auto px-4 py-8">
      
      {toggleQuickView && selectedProduct && <QuickViewModal data={selectedProduct} onClose={() => settoggleQuickView(false)} />}
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
              src={product?.images[activeImageIndex]}
              alt={product?.title}
              className="w-full h-full object-contain"
            />
            <div 
              className="absolute inset-0 bg-no-repeat bg-cover transition-opacity duration-300 opacity-0 hover:opacity-100"
              style={magnifyStyle}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {product?.images.map((image:any, index:number) => (
              <img
                key={index}
                src={image}
                alt={`${product?.title} ${index + 1}`}
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
          <h1 className="text-3xl font-bold mb-4">{product?.title}</h1>
          {/* <div className="flex items-center gap-4 mb-4">
            <img
            <img
              src={dummyProduct.vendor.image}
              alt={dummyProduct.vendor.name}
              className="w-8 h-8 rounded-full"
            />
            <span>{dummyProduct.vendor.name}</span>
          </div> */}
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={product?.rating} />
            <span>{product?.rating.toFixed(1)}</span>
            <span>({product?.reviews.length} reviews)</span>
          </div>
          <p className="text-gray-600 mb-4">{product?.description}</p>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold">${((product?.price - ((product?.discountPercentage / 100) * product?.price))*quantity).toFixed(2)}</span>
            <span className="text-xl text-gray-500 line-through">
              ${product?.price.toFixed(2)}
            </span>
            <span className="text-green-500">
              {product?.discountPercentage}% OFF
            </span>
          </div>
          <div className="flex items-center py-4 space-x-2">
                <span className="text-sm font-medium">Quantity:</span>
                <button
                  onClick={()=> setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                >
                  -
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button
                  onClick={()=> setQuantity(quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full"
                >
                  +
                </button>
              </div>
          <div className="flex gap-4 mb-8">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors">
              Add to Cart
            </button>
            <button onClick={handleBuyClick} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Specifications</h2>
        {Object.entries(dummyProduct.specifications).map(([category, specs]) => (
          <div key={category} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{category}</h3>
            <ul className="grid grid-cols-1 md:grid-cols-1 gap-2">
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

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        
        {/* Review Form */}
        <form onSubmit={handleReviewSubmit} className="mb-8 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Write a Review</h3>
          <div className="mb-4">
            <label className="block mb-2">Your Rating:</label>
            <StarRating 
              rating={newReview.rating} 
              editable={true} 
              onChange={(value:any) => setNewReview({...newReview, rating: value})}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="review-comment" className="block mb-2">Your Review:</label>
            <textarea
              id="review-comment"
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
              className="w-full p-2 border rounded"
              
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Submit Review
          </button>
        </form>

        {/* Existing Reviews */}
        <div className="space-y-4">
          {product.reviews.map((review:any) => (
            <div key={review?.date} className="border-b pb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{review?.reviewerName}</span>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <div className="flex items-center mb-2">
                <StarRating rating={review?.rating} />
                <span className="ml-2">{review?.rating.toFixed(1)}</span>
              </div>
              <p className="text-gray-700">{review?.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* You may also like */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products?.map((product:any) => (
          <div
          key={product.id}
          className="relative p-3 cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-lg hover:translate-y-1 transition-transform duration-200"
          onMouseEnter={() => setquickDemo(product.id)}
          onMouseLeave={() => setquickDemo(0)}
          onClick={()=> navigate(`/product-detail/${product.id}`)}
        >
          <img
            src={product.image || product?.images[0]}
            alt={product.title}
            className="w-full h-36 object-contain"
          />
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              {product.title.length > 80 ? `${product.title.slice(0, 50)}...` : product.title}
            </h3>
            <div className="mb-4">
              <p className="text-base font-bold text-red-600">${(product.price - ((product.discountPercentage / 100) * product.price)).toFixed(2)}</p>
              <p>
                <span className="text-xs line-through text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
                <span className='text-xs ml-1'>-{product.discountPercentage}%</span>
              </p>
            </div>
            <div className='flex justify-between'>
              <button
                type='button'
                className={`bg-white px-3 rounded hover:shadow-sm hover:border transition-opacity duration-300 ${quickDemo === product.id ? 'opacity-100' : 'opacity-0'}`}
              >
                <Cart width={"1.3rem"} height={"1.3rem"} color={"#0C4A6E"} />
              </button>
              <button
                onClick={() => { settoggleQuickView(true); setselectedProduct(product); }}
                type='button'
                className={`bg-white text-[#0C4A6E] text-xs sm:text-sm font-bold hover:shadow-md hover:border py-2 px-4 rounded transition-opacity duration-300 ${quickDemo === product.id ? 'opacity-100' : 'opacity-0'}`}
              >
                Quick view
              </button>
            </div>
          </div>
        </div>
          ))}
        </div>
      </div>
    </div>
  )
}