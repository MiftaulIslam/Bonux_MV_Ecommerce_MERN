import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../state/store/store'
import { updateUser } from '../../state/actions/userAction'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import DangerIcon from '../../widgets/icons/DangerIcon'
import InfoCardIcon from '../../widgets/icons/InfoCardIcon'
import PhoneIcon from '../../widgets/icons/PhoneIcon'
import AddressIcon from '../../widgets/icons/AddressIcon'
import { showAlert } from '../../utils/showAlert'
import { useLoader } from '../../hooks/LoaderProvider'
import { sellerInputLabel, sellerInputTag } from '../../style/style'
import EmailIcon from '../../widgets/icons/EmailIcon'
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const Checkout = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {user} = useSelector((state:RootState)=> state.user)
  const [shippingAddress, setShippingAddress] = useState<any>(null)
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const [product, setProduct] = useState<any>(null)
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const {showLoader, hideLoader} = useLoader()
  
  const query = useQuery();
  const quantity = query.get("quantity") || "";
  const { id } = useParams();
  const navigate = useNavigate()
  const getProductbyId = async () =>{
    showLoader()
      const product = await fetch(`https://dummyjson.com/products/${id}`)
      if(product.ok){
        setProduct(await product.json())
      }else{
navigate('/')
showAlert(false, 'Product not found')
      }
      hideLoader()
  }
useEffect(() => {
const shippingAddress = user.addresses.find((address:any) => address.defaultShipping)

setShippingAddress(shippingAddress)
setSelectedAddress(shippingAddress)
getProductbyId()

}, [])
const calculateDiscountPrice = (discountPercentage:any, originalPrice:any, quantity:any) =>{
return (((originalPrice - ((discountPercentage / 100) * originalPrice))*parseInt(quantity))).toFixed(2)
}
const paymentAddressChange = async (id:any)=>{
  await dispatch(updateUser(`user/update-paymentaddress/${id}?type=shipping`));
}

return (
<>
  <div className="min-h-screen bg-gray-100 p-4">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Left Column - Delivery Information and Package Info */}
      <div className="md:col-span-2 space-y-4">
        {/* Delivery Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          {/* Shipping Address button and header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-gray-600">Shipping & Billing</h2>
            <button
              onClick={() => setIsOffCanvasOpen(true)}
              className="text-blue-500 text-sm hover:underline hover:text-blue-700"
            >
              Edit
            </button>
          </div>
          {/* Info and form */}
          <div>
                  {
                      user.addresses && shippingAddress ? (
                        <>
                          <div className='text-sm text-gray-600 font-semibold space-y-2' >
                            
                        {!user.phone && (<span className='text-xs font-semibold flex items-center gap-2 text-gray-500'>
                          <DangerIcon width={17} height={17}/>
                          No contact number found! Add one before order. <Link className='text-xs text-blue-600 hover:underline font-semibold' to={'/user/my'}>Click here</Link></span>)}
                              <p className='flex items-center justify-start gap-2'><InfoCardIcon width={20} height={20}/>{user.name}</p>
                              <p className={`flex items-center justify-start gap-2 ${!user.phone && 'hidden'}`}>{user.phone && <PhoneIcon width={20} height={20}/>} {user?.phone}</p>
                              <p className='flex items-center justify-start gap-2'><AddressIcon width={20} height={20} />{shippingAddress.address}-{shippingAddress.region}-{shippingAddress.city}-{shippingAddress.zone}</p>
                          </div>
                          </>
                        ):(    <form className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full name</label>
                              <input type="text" id="fullName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Enter your first and last name" />
                            </div>
                            <div>
                              <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
                              <select id="region" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                <option>Please choose your region</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                              <input type="tel" id="phoneNumber" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Please enter your phone number" />
                            </div>
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                              <select id="city" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                <option>Please choose your city</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="building" className="block text-sm font-medium text-gray-700">Building / House No / Floor / Street</label>
                              <input type="text" id="building" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Please enter" />
                            </div>
                            <div>
                              <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area</label>
                              <select id="area" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                                <option>Please choose your area</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="colony" className="block text-sm font-medium text-gray-700">Colony / Suburb / Locality / Landmark</label>
                              <input type="text" id="colony" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="Please enter" />
                            </div>
                            <div>
                              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                              <input type="text" id="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" placeholder="For Example: House# 123, Street# 123, ABC Road" />
                            </div>
                          </div>
                          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">SAVE</button>
                        </form>)
                  }
              </div>
        </div>

        {/* Package Information */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-sm text-gray-600 font-semibold mb-4">Package 1 of 1</h2>
          <p className="text-sm text-gray-500 mb-4">Fulfilled by Bonux</p>
          <div className='grid grid-cols-1 md:grid-cols-3'>
          <div className="border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex items-center space-x-2">
              <input type="radio" id="freeDelivery" name="deliveryOption" checked readOnly />
              <label htmlFor="freeDelivery" className={sellerInputLabel}>Standard Delivery<p className="text-xs text-gray-500 p-0">{product?.shippingInformation}</p></label>
            </div>
            
          </div>
          </div>
         
          <div className="flex items-center space-x-4">
            <img src={product?.images[1]} alt="Product" className="w-20 h-20 object-contain" />
            <div className='w-full'><p className="text-gray-400 text-xs font-bold">Order<span className='text-sm'>#{product?.sku}</span></p>
              <p className="font-semibold">{product?.title}</p>
              {/* <p className="text-sm text-gray-500">No Brand, Color:Clear</p> */}
              <div className="flex text-xs justify-between items-center mt-2">
                <span className="text-blue-500 font-bold">${calculateDiscountPrice(product?.discountPercentage, product?.price, parseInt(quantity))}</span>
                
                <span className="text-gray-500 line-through">${product?.price*parseInt(quantity)}</span>
                <span className="text-green-500">{product?.discountPercentage}% OFF</span>
                <span className='font-semibold'>Qty: {quantity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Promotion, Invoice, and Order Summary */}
      <div className="space-y-4">
        {/* Promotion */}
        <div className="bg-white shadow-md rounded-lg p-6 ">
          <h2 className="text-sm text-gray-500 font-semibold  mb-4">Promotion</h2>
          <div className='flex items-center gap-4'>
          <div className="">
            <input type="text" className={sellerInputTag} placeholder="Enter promo" />
          </div>
          <button type='button' className="mt-1 bg-white text-gray-700 hover:text-white duration-200 text-xs font-semibold h-[2.5rem] inline-block px-4 rounded-md border border-blue-600 hover:bg-blue-600">Apply</button>
          </div>
        </div>

        {/* Invoice and Contact Info */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between  items-start mb-2">
            <div className='space-y-2'>
            <h2 className="text-base text-gray-600 font-semibold">Invoice and Contact Info</h2>
            <p className='text-gray-500 text-sm flex items-center gap-2'><EmailIcon width={17} height={17}/>{user?.email}</p>
            <p className='text-gray-500 flex items-center gap-2 text-sm'><PhoneIcon width={17} height={17}/>{user.phone ? user.phone:'No contact number'}</p>
            
            
            </div>
            <button className="text-blue-500 text-sm hover:underline" onClick={()=> navigate('/user/my')}>Edit</button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-base text-gray-600 font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className='text-gray-500 text-xs font-semibold'>Items Total (1 item)</span>
              <span className='text-xs text-gray-800'> ${calculateDiscountPrice(product?.discountPercentage, product?.price, parseInt(quantity))}</span>
            </div>
            <div className="flex justify-between">
              <span className='text-gray-500 text-xs font-semibold'>Delivery Fee</span>
              <span className='text-xs text-gray-800'>$8</span>
            </div>
            <div className="flex justify-between">
              <span className='text-gray-500 text-xs font-semibold'>Delivery Discount</span>
              <span className='text-xs text-gray-800'>- $2</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className='text-gray-500 text-xs font-semibold'>Total:</span>
              <span className='text-xs text-gray-800'>${parseInt((calculateDiscountPrice(product?.discountPercentage, product?.price, parseInt(quantity))))+5}</span>
            </div>
            <p className="text-sm text-gray-500">VAT included, where applicable</p>
          </div>
          <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md mt-4 hover:bg-gray-300">Proceed to Pay</button>
        </div>
      </div>
    </div>
  </div>

  {/* Off-canvas component */}
  {isOffCanvasOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
    <div className="bg-white w-full max-w-md h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-base font-semibold">Your Addresses </h2>
        <Link to={"/user/addresses"} className='text-xs text-blue-600 hover:underline cursor-pointer'>New +</Link>
        </div>
        <div className="space-y-4">
          
        {(user.addresses && user.addresses.length > 0) ? user.addresses.map((address:any) => (
            <div key={address._id} className="flex items-center space-x-3 border border-gray-200 rounded-md p-4">
              <input
                type="radio"
                id={`address-${address._id}`}
                name="address"
                value={address._id}
                checked={selectedAddress?._id === address._id}
                onChange={() => {setSelectedAddress(address)}}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <label htmlFor={`address-${address._id}`} className="flex-grow">
              <h3 className="font-semibold text-gray-600 mb-1 text-xs">{address.zone}-{address.city}-{address.region}</h3>
                <h3 className=" mb-1 text-sm text-gray-500">{address.address}</h3>
                
                <p className="text-sm flex flex-col sm:flex-row gap-1 sm:gap-4 text-blue-500">
                  {address.defaultShipping && (
                  <span className='border text-xs rounded px-2 py-[0.2rem] inline-block'>Default Shipping Address</span>
                  
                  )}

                  {address.defaultBilling && (
                  <span className='border rounded text-xs px-2 py-[0.2rem] inline-block'>Default Billing Address</span>)}</p>
              </label>
            </div>
          )):(
              <div>No address available.</div>
          )}
        </div>
        <div className='flex items-center flex-wrap gap-4'>
        <button onClick={()=>paymentAddressChange(selectedAddress?._id)} className="mt-6 bg-white text-gray-700 hover:text-white duration-200 text-xs font-semibold py-2 px-4 rounded-md border border-blue-600 hover:bg-blue-600">
          Save
        </button>
        <button onClick={()=>{setIsOffCanvasOpen(false); setSelectedAddress(shippingAddress)}} className="mt-6 bg-white text-gray-700 hover:text-white duration-200 text-xs font-semibold py-2 px-4 rounded-md border border-red-600 hover:bg-red-600">
          Close
        </button>
        </div>
      </div>
    </div>
  </div>
  )}
</div>








</>
)
}

export default Checkout