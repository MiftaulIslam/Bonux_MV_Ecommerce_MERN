import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { maskEmail } from "../../utils/MaskEmail";
import { useLoader } from "../../hooks/LoaderProvider";
import { useEffect, useState } from "react";
import { RootState } from "../../state/store/store";
import { UserAddress } from "../../models/StateType";


const ManageProfile = () => {
  
    const{showLoader, hideLoader} = useLoader()
    const { user, loading } = useSelector((state:RootState) => state.user);
    const [shippingAddress, setShippingAddress] = useState<UserAddress|null>(null)
    const [billingAddress, setBillingAddress] = useState<UserAddress|null>(null)


        useEffect(() => {
            if(loading) {showLoader()}else{
              hideLoader()
              const shippingAddress = user.addresses.find((address:UserAddress) => address.defaultShipping);
              const billingAddress = user.addresses.find((address:UserAddress) => address.defaultBilling);
              setShippingAddress(shippingAddress ? shippingAddress : null);
              setBillingAddress(billingAddress ? billingAddress : null);
         
            }
        }, [ ])
        
  return (
    <div>
     <h2 className="text-2xl font-bold mb-6">Manage profile</h2>
      {/* Profile */}
      <section className="bg-white shadow rounded-lg p-6 ">
        {/* Personal Profile buttons */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Personal info</h2>
          <Link to={"my"} className="text-blue-600 hover:text-blue-800">EDIT</Link>
        </div>
        <div className="space-y-2 text-gray-600">
          <p>{user.name}</p>
          <p>{maskEmail(user.email)}</p>
          <p>{user?.phone}</p>
        </div>
      </section>



      {/* Address Book */}
      <section className="bg-white shadow rounded-lg p-6 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Address Book</h2>
          <Link to={"addresses"} className="text-blue-600 hover:text-blue-800">Add</Link>
        </div>
        {/* Addresses */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded p-4">
            <p className="text-gray-600 mb-2">
            <span className="text-gray-700 text-base font-bold">
          {shippingAddress && user.name} 

            </span> <br />
              {!shippingAddress && 'Save your shipping address here'}
              {
              shippingAddress && shippingAddress.address
              } <br />
              {
                shippingAddress && `${shippingAddress.region} - ${shippingAddress.city} - ${shippingAddress.zone}`
                }<br />
                {
                  (shippingAddress && user.phone) && user.phone
                }</p>
          </div>
          <div className="border border-gray-200 rounded p-4">
          <p className="text-gray-600 mb-2">
            <span className="text-gray-700 text-base font-bold">
          {billingAddress && user.name} <br />

            </span>
              {!billingAddress && 'Save your billing address here'}
              {
              billingAddress && billingAddress.address
              } <br />
              {
                billingAddress && `${billingAddress.region} - ${billingAddress.city} - ${billingAddress.zone}`
                }<br />
                {
                  (billingAddress && user.phone) && user.phone
                }</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ManageProfile;




