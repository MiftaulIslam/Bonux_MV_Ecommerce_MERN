import  { useEffect, useState } from 'react';
import { DataTable } from '../../widgets';
import { GetService } from '../../utils/HTTP/Get';
import { base_url, default_src } from '../../static/data';
import Loader from '../../widgets/Loader';
import { Modal } from '../../widgets';
import { PutService } from '../../utils/HTTP/Put';
import { PostService } from '../../utils/HTTP/Post';
import { DeleteService } from '../../utils/HTTP/Delete';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store/store';
// import { PostService, PutService, DeleteService } from '../../utils/HTTP';
const StockBadge = ({ status, quantity }: { status: string; quantity: number }) => {
    let bgColor = ''
    switch (status) {
      case 'in stock':
        bgColor = 'bg-green-100 text-green-800'
        break
      case 'low stock':
        bgColor = 'bg-yellow-100 text-yellow-800'
        break
      case 'out of stock':
        bgColor = 'bg-red-100 text-red-800'
        break
      default:
        bgColor = 'bg-gray-100 text-gray-800'
    }
  
    return (
      <span className={`px-2 w-[6rem] inline-flex text-xs leading-5 font-semibold rounded-full ${bgColor}`}>
        {status} ({quantity})
      </span>
    )
  }
const ManageProduct = () => {
  const {store} = useSelector((state:RootState)=> state.store)
  const [products, setProducts] = useState<any>(null);
  const [selectedProduct] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const pageSizeOptions = [10, 20, 50, 100];

  const getProducts = async () => {
    setLoading(true);
    const data = await GetService(`product/products?store=${store._id}`);
    if (data) {
      setProducts(data.data.data);
    }
    setLoading(false);
  };

//   const fetchProduct = async (id) => {
//     setLoading(true);
//     const product = await GetService(`${base_url}/product/${id}`);
//     if (product) {
//       setSelectedProduct(product.data);
//       setIsEditModalOpen(true);
//     }
//     setLoading(false);
//   };

  const deleteProduct = async (id:any) => {
    setLoading(true);
    await DeleteService(`${base_url}/product/delete/${id}`);
    setLoading(false);
    getProducts();
  };

  const addProduct = async (body:any) => {
    setLoading(true);
    await PostService(`${base_url}/product/add`, true, body);
    setLoading(false);
    getProducts();
  };

  const updateProduct = async (body:any, id:any) => {
    setLoading(true);
    await PutService(`${base_url}/product/update/${id}`, true, body);
    setLoading(false);
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  const columns = () => [
    { column: 'name', label: 'Product Name' },
    { column: 'description', label: 'Description' },
    { 
      column: 'price', 
      label: 'Original Price', 
      render: (row:any) =>{
        return <span>${row.original_price}</span> }
    },
    { 
      column: 'price', 
      label: 'Discount percentage', 
      render: (row:any) =>{
        return <span>${row.discount_percentage}%</span> }
    },
    { 
      column: 'price', 
      label: 'Discount amount', 
      render: (row:any) =>{
        return <span>${(row.original_price-(row.discount_percentage / 100) * row.original_price)}</span> }
    },
    { 
      column: 'stock', 
      label: 'Stock Status', 
      render: (row:any) => {return    <StockBadge status={row.status} quantity={row.quantity} />}
    },
    { 
      column: 'images', 
      label: 'Images', 
      render: (row:any) => {
        return row.map((x:any) => (  <img
        key={x.url}
        src={`${default_src}${x.url}`}
        alt={x.alt_text}
        className="mr-4 h-[50px] object-contain w-[50px] rounded-full"
      />)) }
    },
    { 
      column: 'attributes', 
      label: 'Attributes', 
      render: (row:any) => {return <ul className='w-[8rem]'>
        <li><span className='font-semibold'>Color:</span> {row.color}</li>
        <li><span className='font-semibold'>Size:</span> {row.size}</li>
        <li><span className='font-semibold'>Weight:</span> {row.weight}</li>
      </ul>}
    },
    { 
      column: 'ratings', 
      label: 'Review Counts', 
      render: (row:any) =>  {return <span>{row.reviews_count}</span>}
    },
    { 
      column: 'delivery', 
      label: 'Delivery Info', 
      render: (row:any) => {return <ul className='w-[8rem]'>
        <li><span className='font-semibold'>ETA:</span> {row.estimated_delivery_date}</li>
        <li><span className='font-semibold'>DT:</span> {row.delivery_time}</li>
        <li><span className='font-semibold'>Status:</span> {row.status}</li>
      </ul>} 
    },
  ];

  const inputData = () => {
    return [
      { type: 'text', label: 'Product Name', name: 'name', value: selectedProduct?.name || '', required: true },
      { type: 'textarea', label: 'Description', name: 'description', value: selectedProduct?.description || '', required: true },
      { type: 'number', label: 'Price', name: 'price', value: selectedProduct?.price?.original_price || '', required: true },
      { type: 'number', label: 'Stock Quantity', name: 'quantity', value: selectedProduct?.stock?.quantity || '', required: true },
      { type: 'text', label: 'Color', name: 'color', value: selectedProduct?.attributes?.color || '', required: true },
      { type: 'text', label: 'Size', name: 'size', value: selectedProduct?.attributes?.size || '', required: true },
      { type: 'file', label: 'Image', name: 'image', required: true }
    ];
  };

  if (loading) return <Loader status={'partial'} />;

  return (
    <div>
      {products && (
        <DataTable
          addFeature={true}
          isAddModalOpen={isAddModalOpen}
          onAddModalOpen={setIsAddModalOpen}
          data={products}
          columns={columns}
          pageSizeOptions={pageSizeOptions}
        />
      )}

      {isAddModalOpen && (
        <Modal
          action="add"
          modalLabel="Add Product"
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          input={inputData}
          onSubmit={addProduct}
        />
      )}

      {isEditModalOpen && (
        <Modal
          action="update"
          modalLabel="Update Product"
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          input={inputData}
          onSubmit={updateProduct}
          data={selectedProduct}
        />
      )}

      {isDeleteModalOpen && (
        <Modal
          action="delete"
          modalLabel="Delete Product"
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onSubmit={deleteProduct}
          data={selectedProduct}
        />
      )}
    </div>
  );
};

export default ManageProduct;
