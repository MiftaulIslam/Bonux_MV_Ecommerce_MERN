import  { useCallback, useEffect, useRef, useState } from 'react'
import { useLoader } from '../../hooks/LoaderProvider'
import QuickViewModal from '../../components/Helper/QuickViewModal'
import { useLocation, useNavigate } from 'react-router-dom'
import Cart from '../../widgets/icons/Cart'
import { sellerInputLabel, sellerInputTag } from '../../style/style'
import { showAlert } from '../../utils/showAlert'
import useCapitalization from '../../hooks/CapitalizationProvider'
import ProductCard from '../../components/Helper/ProductCard'
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
  const {capitalizeFirstLetter} = useCapitalization()
    return (
      <div>
         <div className="grid grid-cols-2 justify-between items-center mb-6">
          <h1 className="text-lg text-gray-600 font-bold">{capitalizeFirstLetter(q)} Products ({totalProducts} items found)</h1>
          <div className="justify-self-end">
            
            <select
              className={`${sellerInputTag}`}
              onChange={(e) => sortProducts(e.target.value as 'asc' | 'desc')}
              value={sortOrder}
              title="sort price"
              id='sortPrice'
            >
              <option value="">Sort price</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product:any) => (

          <div key={product.id}>
            <ProductCard product={product}/>
          </div>
          ))}
        <div ref={loader} className="h-10" />
        </div>
      </div>
    )
}

export default ProductSearch