import  { useEffect, useState } from 'react';
import ProductCard from '../Helper/ProductCard';

const JustForYou = () => {
  const [products, setproducts] = useState<any>([]);
  const [pageSize, setPageSize] = useState(0);

 

  const fetchProduct = async (size:any) => {
    const data = await fetch(`https://dummyjson.com/products/category/smartphones?limit=10&skip=${size}`);
    const jsonData = await data.json();
    setproducts((prevProducts:any) => [...prevProducts, ...jsonData.products]); // Merge with existing products
  };

  useEffect(() => {
    fetchProduct(pageSize);
  }, [pageSize]); // Fetch products whenever pageSize changes

  const handleLoadMore = () => {
    setPageSize((prevSize) => prevSize + 10); // Increase pageSize by 10
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800">Just for you</h2>
      <div className="flex justify-between items-center mb-2">
        <h4 className='text-base font-bold text-blue-800'>On sale now</h4>
        <button type='button' className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
          See more
        </button>
      </div>
      <hr />
      <div className="grid py-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {products.map((product:any) => (

<div key={product.id}>
  <ProductCard product={product}/>
</div>
        ))}
      </div>
      <div className='text-center my-2'>
        <button 
          type='button' 
          className='text-[#0C4A6E] hover:shadow-md border duration-200 border-[#0C4A6E] font text-lg w-full py-1 sm:w-2/5'
          onClick={handleLoadMore}
        >
          Load more
        </button>
      </div>
    </section>
  );
}

export default JustForYou;
