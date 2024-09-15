import React, { useState } from 'react'
import { Cart } from '../../widgets/icons'
import QuickViewModal from '../Helper/QuickViewModal'

const JustForYou = () => {
    
  const [quickDemo, setquickDemo] = useState(0)
  const [toggleQuickView, settoggleQuickView] = useState(false)
  const [selectedProduct, setselectedProduct] = useState(null)
    const products = [
      {
        id: 1,
        name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        rating: 4.5,
        review_number: 120,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        vendor: {
          name: "TechStore",
          image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore"
        }
      },
      {
        id: 14523,
        name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        rating: 4.2,
        review_number: 312,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        vendor: {
          name: "GadgetWorld",
          image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=GadgetWorld"
        }
      },
      {
        id: 14325432,
        name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        rating: 4.7,
        review_number: 205,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        vendor: {
          name: "PhoneHub",
          image: "https://via.placeholder.com/150/00FF00/000000?text=PhoneHub"
        }
      },
      {
        id: 1434535,
        name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        rating: 4.3,
        review_number: 140,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        vendor: {
          name: "MobileMarket",
          image: "https://via.placeholder.com/150/FFFF00/000000?text=MobileMarket"
        }
      },
      {
        id: 145366398732,
        name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        rating: 4.8,
        review_number: 458,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        vendor: {
          name: "LuxuryPhones",
          image: "https://via.placeholder.com/150/FF00FF/000000?text=LuxuryPhones"
        }
      },
      {
        id: 14132134345637,
        name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        rating: 4.6,
        review_number: 350,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        vendor: {
          name: "GadgetWorld",
          image: "https://via.placeholder.com/150/FF0000/FFFFFF?text=GadgetWorld"
        }
      },
      {
        id: 2,
        name: "Exceptional Quality - IPhone 11 to 14 Pro max - Must Have - Easy to Use - Advanced Make For Your Upscale Lifestyle",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        image: "https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg",
        rating: 4.1,
        review_number: 96,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        vendor: {
          name: "TechStore",
          image: "https://via.placeholder.com/150/0000FF/808080?text=TechStore"
        }
      },
      {
        id: 3,
        name: "Exceptional Q",
        price: 79.99,
        discount_percentage: 10,
        originalPrice: 129.99,
        images: ["https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg", "https://th.bing.com/th/id/R.5e61e51fdf82c2bff8dbf92d1b824246?rik=EhhH7pniCl08hA&pid=ImgRaw&r=0", "https://mobilepriceall.com/wp-content/uploads/2022/09/Apple-iPhone-14-Pro-Max.jpg","https://th.bing.com/th/id/R.da8dc52419e9ea6dec6d2323f811ebd7?rik=Rxm840zSwRSmlQ&pid=ImgRaw&r=0"],
        rating: 4.4,
        review_number: 168,
        description: "This iPhone model is perfect for your upscale lifestyle. Easy to use and advanced features make it a must-have.",
        
        vendor: {
          name: "PhoneHub",
          image: "https://s3-eu-west-1.amazonaws.com/tpd/logos/4f383288000064000512d5ba/0x0.png"
        }
      },
      ]
    
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-800">Just for you</h2>
    <div className="flex justify-between items-center mb-2">
      <h4 className='text-base font-bold text-blue-800'>On sale now</h4>
      <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
        See more
        {/* <ArrowRightIcon className="ml-2 h-5 w-5" /> */}
      </button>
    </div>
    <hr />
    <div className="grid py-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {products.slice(0,10).map((product) => (
        
        <div
          key={product.id}
          className="relative p-3 cursor-pointer bg-white rounded-lg overflow-hidden hover:shadow-lg hover:translate-y-1 transition-transform duration-200"
          onMouseEnter={() => setquickDemo(product.id)}
          onMouseLeave={() => setquickDemo(0)}
        >
          <img
            src={product.image || product?.images[0]}
            alt={product.name}
            className="w-full h-36 object-cover"
          />
          <div className="">
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
            onClick={()=> {settoggleQuickView(true); setselectedProduct(product)}}
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
    <div className='text-center my-2'>
        <button type='button' className='text-[#0C4A6E] hover:shadow-md border duration-200 border-[#0C4A6E] font- text-lg w-full py-1 sm:w-2/5'>Load more</button>
    </div>
    {toggleQuickView && selectedProduct && <QuickViewModal data={selectedProduct} onClose={()=> settoggleQuickView(false)}/>}
  </section>
  )
}

export default JustForYou