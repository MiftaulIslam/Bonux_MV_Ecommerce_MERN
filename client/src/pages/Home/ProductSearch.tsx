import  { useCallback, useEffect, useRef, useState } from 'react'
import { useLoader } from '../../hooks/LoaderProvider'
import QuickViewModal from '../../components/Helper/QuickViewModal'
import { useLocation, useNavigate } from 'react-router-dom'
import Cart from '../../widgets/icons/Cart'
import { sellerInputLabel, sellerInputTag } from '../../style/style'
import { showAlert } from '../../utils/showAlert'
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
const ProductSearch = () => {
    const query = useQuery();
    const q = query.get("q") || "";
    const navigate = useNavigate()
    const [products, setProducts] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [sortOrder, setSortOrder] = useState<any>('')  
    const [totalProducts, setTotalProducts] = useState(0);
    const [toggleQuickView, settoggleQuickView] = useState(false)
    const [selectedProduct, setselectedProduct] = useState(false)
    const [quickDemo, setquickDemo] = useState(0)
    const [page, setPage] = useState(1)
    const loader = useRef(null)
  const{showLoader, hideLoader} = useLoader()
    const fetchProducts = useCallback(async () => {  
        
        if (products.length >= totalProducts && totalProducts > 0) return; 
        setLoading(true)
      showLoader()
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${q}&limit=10&skip=${(page - 1) * 10}`)
        const data = await response.json() 
        if (totalProducts === 0) {
            setTotalProducts(data.total);
          }
        setProducts((prevProducts:any) => [...prevProducts, ...data.products])
        setPage(prevPage => prevPage + 1)
      } catch (error) {
        navigate('/')
        showAlert(false,'Unable to find the products')
      } finally {setLoading(false)
        hideLoader()
        
      }
    }, [page])
    useEffect(() => {
      fetchProducts()
    }, [])
  
    useEffect(() => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0].isIntersecting && !loading) {
            fetchProducts()
          }
        },
        { threshold: 1.0 }
      )
  
      if (loader.current) {
        observer.observe(loader.current)
      }
  
      return () => observer.disconnect()
    }, [loading, fetchProducts])
  
    const sortProducts = (order: 'asc' | 'desc') => {
      setSortOrder(order)
      const sortedProducts = [...products].sort((a, b) =>
        order === 'asc' ? a.price - b.price : b.price - a.price
      )
      setProducts(sortedProducts)
    }
  
    return (
      <div className="container mx-auto px-4 py-8">
        
    {toggleQuickView && selectedProduct && <QuickViewModal data={selectedProduct} onClose={()=> settoggleQuickView(false)}/>}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Phone Products ({totalProducts} items found)</h1>
          <div className="flex items-center gap-4">
            <label htmlFor="shortPrice" className={`${sellerInputLabel} w-[5rem]`}>Short by:</label>
            <select
              className={sellerInputTag}
              onChange={(e) => sortProducts(e.target.value as 'asc' | 'desc')}
              value={sortOrder}
              id='shortPrice'
            >
              <option value="">Sort price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product:any) => (
            // <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            //   <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
            //   <div className="p-4">
            //     <h2 className="text-lg font-semibold mb-2">{product.title}</h2>
            //     <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
            //     <div className="flex justify-between items-center">
            //       <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            //       <span className="text-sm text-gray-500">Rating: {product.rating.toFixed(1)}</span>
            //     </div>
            //     <div className="mt-2 flex justify-between items-center">
            //       <span className="text-sm text-green-600">
            //         {product.discountPercentage.toFixed(0)}% OFF
            //       </span>
            //       <span className="text-sm text-gray-500">Stock: {product.stock}</span>
            //     </div>
            //   </div>
            // </div>
            <div
            key={product.id}
            className="relative bg-white rounded-lg overflow-hidden hover:shadow-lg hover:translate-y-1 cursor-pointer transition-transform duration-200"
            // onClick={()=> navigate(`product-detail/${product.id}`)}
            onMouseEnter={() => setquickDemo(product.id)}
            onMouseLeave={() => setquickDemo(0)}
          >
            <img
            onClick={()=> navigate(`/product-detail/${product.id}`)}
              src={product.images[0]}
              alt={product.title}
              className="w-full h-36 object-contain"
            />
            <div className="p-3">
              {/* Product info */}
              <div onClick={()=> navigate(`product-detail/${product.id}`)}>
              <h3 className="text-sm font-semibold text-gray-800 mb-2">
                {product.title.length > 80 ? `${product.title.slice(0,50)}...` : product.title}
              </h3>
                <div className='flex'>

                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}

                <span className='text-sm text-gray-500 mx-2'>{product.rating}({product.reviews.length} reviews)</span>
                </div>
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
        <div ref={loader} className="h-10" />
      </div>
    )
}

export default ProductSearch