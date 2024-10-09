import  { useEffect, useState } from 'react'
import  Cart  from '../../widgets/icons/Cart'
import QuickViewModal from '../Helper/QuickViewModal'
import { useNavigate } from 'react-router-dom'

const FlashSale = () => {
  const [toggleQuickView, settoggleQuickView] = useState(false)
  const [selectedProduct, setselectedProduct] = useState(false)
  const [quickDemo, setquickDemo] = useState(0)
  const [products , setProducts] = useState<any>(null)
  const navigate = useNavigate()

  const fetchProduct =async ()=>{
    const data = await fetch('https://dummyjson.com/products/category/smartphones?limit=10&skip=10')
    const jsonData = await data.json()

    setProducts(jsonData.products)
  }
  console.log(selectedProduct)
  useEffect(() => {
    fetchProduct()
  }, [])
  
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 shadow-sm">
      
    {toggleQuickView && selectedProduct && <QuickViewModal data={selectedProduct} onClose={()=> settoggleQuickView(false)}/>}
    <h2 className="text-2xl font-bold text-gray-800">Flash Sale</h2>
    <div className="flex justify-between items-center mb-2">
      <h4 className='text-base font-bold text-blue-800'>On sale now</h4>
      <button type='button' className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
        See more
        {/* <ArrowRightIcon className="ml-2 h-5 w-5" /> */}
      </button>
    </div>
    <hr />
    <div className="grid py-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {products && products.slice(0,5).map((product:any) => (
        <div
          key={product.id}
          className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg hover:translate-y-1 cursor-pointer transition-transform duration-200"
          // onClick={()=> navigate(`product-detail/${product.id}`)}
          onMouseEnter={() => setquickDemo(product.id)}
          onMouseLeave={() => setquickDemo(0)}
        >
          <img
          onClick={()=> navigate(`product-detail/${product.id}`)}
            src={product.images[0]}
            alt={product.title}
            className="w-full h-36 object-contain"
          />
          <div className="p-3">
            {/* Product info */}
            <div onClick={()=> navigate(`product-detail/${product.title.split("").join("-")}/${product.id}`)}>
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              {product.title.length > 80 ? `${product.title.slice(0,50)}...` : product.title}
            </h3>


            <div className="mb-4">
              <p className="text-base font-bold text-red-600">${(product.price - ((product.discountPercentage / 100)*product.price)).toFixed(2)}</p>
              <p>
                <span className="text-xs line-through text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
                <span className='text-xs ml-1'>-{product.discountPercentage}%</span>
              </p>
            </div>


            </div>
            {/* Quick buttons */}
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
  </section>
  )
}

export default FlashSale