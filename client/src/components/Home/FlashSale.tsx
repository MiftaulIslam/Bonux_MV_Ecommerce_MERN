import  { useEffect, useState } from 'react'
import ProductCard from '../Helper/ProductCard'

const FlashSale = () => {
  const [products , setProducts] = useState<any>(null)


  const fetchProduct =async ()=>{
    const data = await fetch('https://dummyjson.com/products/category/smartphones?limit=10&skip=10')
    const jsonData = await data.json()

    setProducts(jsonData.products)
  }
  useEffect(() => {
    fetchProduct()
  }, [])
  
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 shadow-sm">
      
    <h2 className="text-2xl font-bold text-gray-800">Flash Sale</h2>
    <div className="flex justify-between items-center mb-2">
      <h4 className='text-base font-bold text-blue-800'>On sale now</h4>
      <button type='button' className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
        See more
      </button>
    </div>
    <hr />
    <div className="grid py-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {products && products.slice(0,4).map((product:any) => (

        <div key={product.id}>

          <ProductCard product={product}/>
        </div>
      ))}
    </div>
  </section>
  )
}

export default FlashSale