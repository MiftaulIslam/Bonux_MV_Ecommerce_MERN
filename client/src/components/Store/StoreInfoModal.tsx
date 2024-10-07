import React, { useState } from 'react'
import  Close  from '../../widgets/icons/Close'
import { geo } from '../../static/geoBd';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../widgets/Loader';
import {time} from '../../static/data'
import { updateStore } from '../../state/actions/storeAction';
import { storeInfoModalProp } from '../../models/PropType';
import { AppDispatch, RootState } from '../../state/store/store';
const StoreInfoModal:React.FC<storeInfoModalProp> = ({onClose}) => {
  const disptach = useDispatch<AppDispatch>()
  const { loading, store } = useSelector((state:RootState) => state.store);

  const [formData, setFormData] = useState({
    name: store?.name || "",
    description: store?.description || "",
    address: store?.address.address || "",
    region: store?.address.region || "",
    city: store?.address.city || "",
    zone: store?.address.zone || "",
    shop_status: store?.shop_status || "",
    opening_hours: store?.opening_hours || "",
    closing_hours: store?.closing_hours || "",
  });

  const selectedRegion = geo.regions.find((x) => x.name === formData.region);
  const cities = selectedRegion ? selectedRegion.cities : [];

  const selectedCity = cities.find((x) => x.name === formData.city);

  const zones = selectedCity ? selectedCity.zones : [];
  console.log(store)
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>|React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  
  const handleSubmit = async (e: any) => {
    e.preventDefault(); // Prevent the default form submission

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('opening_hours', formData.opening_hours);
    formDataToSend.append('closing_hours', formData.closing_hours);
    formDataToSend.append('shop_status', formData.shop_status);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('region', formData.region);
    formDataToSend.append('city', formData.city);
    formDataToSend.append('zone', formData.zone);


    // const data = await PutService(`store/update-info/${store._id}`,true,formDataToSend)
    disptach(updateStore(`store/update-info/${store._id}`, formDataToSend))
    onClose()
  };

  if(loading) return <Loader/>

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-600/45 backdrop-blur-sm">
      <div className="relative w-full max-w-lg">
        <div className="bg-white rounded-sm shadow p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
          <div className=" bg-white z-10 pb-2">
            <div className="relative flex justify-center mb-2">
              <h1 className="font-semibold text-gray-600 text-lg">Edit profile</h1>
              <button
              type='button'
                className="absolute top-0 right-0 cursor-pointer"
                onClick={onClose}
                aria-label="Close"
              >
                <Close />
              </button>
            </div>
            <hr />
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {/* Form fields */}
            <div className="w-full">
              <label htmlFor="name" className="text-xs font-semibold text-gray-500">
                Store name:
              </label>
              <input
                type="text"
                placeholder="Enter store name"
                className="border w-full px-4 py-2 rounded shadow focus:outline-none text-sm text-gray-600"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-full'>
              <label htmlFor="description" className='text-xs font-semibold text-gray-500'>Store description:</label>
              <textarea name="description" id="description"  className='border w-full px-4 py-2 rounded shadow focus:outline-none text-sm text-gray-600' placeholder="Shop's description" onChange={handleInputChange} value={formData.description}/>
            </div>

            {/* Address */}
            <div className='w-full'>
     
              <div>
                <label htmlFor="address" className='text-xs font-semibold text-gray-500'>Address:</label>
                <input type="text" placeholder="Enter shop's address" className='border w-full px-4 py-2 rounded shadow focus:outline-none text-sm text-gray-600'  name="address" id="address" onChange={handleInputChange} value={formData.address}/>
              </div>
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 '>
                  <div>
                    <label htmlFor="region" className='text-xs font-semibold text-gray-500'>Region:</label>
                    <select name="region" className='text-sm text-gray-600 focus:outline-none w-full border py-2 px-1 rounded shadow' id="region" onChange={handleInputChange} value={formData.region}>
                      <option value="">Select a region</option>
                      {geo.regions.map((region) => (
                        <option key={region.name} value={region.name}>{region.name}</option>
                      ))}
                    </select>
                  </div> 
                   <div>
                    <label htmlFor="city" className='text-xs font-semibold text-gray-500'>City:</label>
                    <select className='text-sm text-gray-600 focus:outline-none w-full border py-2 px-1 rounded shadow' name="city" id="city" onChange={handleInputChange} value={formData.city}>
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city.name} value={city.name}>{city.name}</option>
                      ))}
                    </select>
                  </div>
                   <div>
                    <label htmlFor="zone" className='text-xs font-semibold text-gray-500'>Zone:</label>
                    <select className='text-sm text-gray-600 focus:outline-none w-full border py-2 px-1 rounded shadow' name="zone" id="zone" onChange={handleInputChange} value={formData.zone}>
                      <option value="">Select a zone</option>
                      {zones.map((zone) => (
                        <option key={zone} value={zone}>{zone}</option>
                      ))}
                    </select>
                  </div>
              </div>
            </div>
            {/* Status */}
            <div className="w-full">
              <label htmlFor="shop_status" className='text-xs font-semibold text-gray-500'>Status:</label>
              <select name="shop_status" className='text-sm text-gray-600 focus:outline-none w-full border py-2 px-1 rounded shadow' id="shop_status" onChange={handleInputChange} value={formData.shop_status}>
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            {/* openingHours */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div> <label htmlFor="opening_hours" className='text-xs font-semibold text-gray-500'>Opening hours:</label>
              <select name="opening_hours" className='text-sm text-gray-600 focus:outline-none w-full border py-2 px-1 rounded shadow' id="opening_hours" onChange={handleInputChange} value={formData.opening_hours}>
                <option value="">Select opening hour</option>
                {time.map((x, i) =>(
                  <option key={i} value={x}>{x}</option>
                ) )}
              </select>
              </div>
               <div> <label htmlFor="closing_hours" className='text-xs font-semibold text-gray-500'>Closing hours:</label>
              <select name="closing_hours" className='text-sm text-gray-600 focus:outline-none w-full border py-2 px-1 rounded shadow' id="closing_hours" onChange={handleInputChange} value={formData.closing_hours}>
                <option value="">Select closing hour</option>
                {time.map((x, i) =>(
                  <option key={i} value={x}>{x}</option>
                ) )}
              </select>
              </div>
              </div>
            </div>
            <div className="flex gap-4 justify-end items-end w-full mt-4">
              <button
              onClick={handleSubmit}
                type="button"
                className="inline-flex justify-center px-4 py-2 text-xs font-semibold text-gray-600 duration-200 hover:text-white bg-white hover:bg-blue-500 border border-blue-500 rounded shadow-sm focus:outline-none"
              >
                Submit
              </button>
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-xs font-semibold text-gray-600 hover:text-white bg-white hover:bg-red-500 duration-200 border border-red-500 rounded shadow-sm focus:outline-none"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoreInfoModal