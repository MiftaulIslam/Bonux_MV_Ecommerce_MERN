import  { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../state/store/store'
import { updateUser } from '../../state/actions/userAction'
import { Link } from 'react-router-dom'

export default function Checkout() {
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector((state:RootState)=> state.user)
    const [shippingAddress, setShippingAddress] = useState<any>(null)
    const [selectedAddress, setSelectedAddress] = useState<any>(null)
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
useEffect(() => {
  const shippingAddress = user.addresses.find((address:any) => address.defaultShipping)

setShippingAddress(shippingAddress)
setSelectedAddress(shippingAddress)
}, [])

const paymentAddressChange = async (id:any)=>{
    await dispatch(updateUser(`user/update-paymentaddress/${id}?type=shipping`));
}

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Delivery Information */}
          <div className="w-full md:w-2/3">
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xs text-gray-500 font-semibold">Shipping & Billing</h2>
                <button
                  onClick={() => setIsOffCanvasOpen(true)}
                  className="text-blue-600  text-sm hover:text-blue-700 hover:underline"
                >
                  Edit
                </button>
              </div>
                <div>
                    {
                        user.addresses && shippingAddress ? (
                            <div>
                                <p>{user.name}</p>
                                <p>{user?.phone}</p>
                                <p>{shippingAddress.address}</p>
                            </div>
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
          </div>

          {/* Right Column - Promotion and Order Summary */}
          <div className="w-full md:w-1/3">
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4">Promotion</h2>
              <div className="flex">
                <input type="text" className="flex-grow border border-gray-300 rounded-l-md p-2" placeholder="Enter Store/Daraz Code" />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md">APPLY</button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">Invoice and Contact Info</h2>
                <button className="text-blue-500">Edit</button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Items Total (1 items)</span>
                  <span>৳ 382</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>৳ 5,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Discount</span>
                  <span>-৳ 5,000</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>৳ 382</span>
                </div>
                <p className="text-sm text-gray-500">VAT included, where applicable</p>
              </div>
              <button className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md mt-4 hover:bg-gray-300">Proceed to Pay</button>
            </div>
          </div>
        </div>

        {/* Package Information */}
        <div className="bg-white shadow-md rounded-lg p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Package 1 of 1</h2>
          <p className="text-sm text-gray-500 mb-4">Fulfilled by Daraz</p>
          <div className="border border-gray-200 rounded-md p-4">
            <h3 className="font-semibold mb-2">Delivery Option</h3>
            <div className="flex items-center space-x-2">
              <input type="radio" id="freeDelivery" name="deliveryOption" checked readOnly />
              <label htmlFor="freeDelivery">FREE Standard Delivery</label>
            </div>
            <p className="text-sm text-gray-500 ml-6">Get by 28 Oct-4 Nov</p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <img src="/placeholder.svg?height=80&width=80" alt="Product" className="w-20 h-20 object-cover" />
            <div>
              <p className="font-semibold">শীতের গরম কাপড় সংরক্ষণ জন্য ইউএসবি পাওয়ারবেঞ্চসহ LED মথ বোর্ড লাইট সাইড মথ ট্র্যাপ উড আলোর বার্ড</p>
              <p className="text-sm text-gray-500">No Brand, Color:Clear</p>
              <div className="flex justify-between items-center mt-2">
                <span className="text-blue-500 font-semibold">৳ 382</span>
                <span className="text-gray-500 line-through">৳ 1,908</span>
                <span className="text-green-500">-80%</span>
                <span>Qty: 1</span>
              </div>
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
              <button onClick={()=>paymentAddressChange(selectedAddress?._id)} className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Save
              </button>
              <button onClick={()=>{setIsOffCanvasOpen(false); setSelectedAddress(shippingAddress)}} className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}