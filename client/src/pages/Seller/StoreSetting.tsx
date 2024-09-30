import React, { useState } from 'react';
import { geo } from '../../static/geoBd';

export default function StoreSettings() {
  const [formData, setFormData] = useState({
    name_bn: '',
    name_en: '',
    description: '',
    media: {
      logo: '',
      banner: '',
    },
    address: {
      address: '',
      region: '',
      city: '',
      zone: '',
    },
    opening_hours: '',
    closing_hours: '',
    shop_status: '',
  });

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogoFile(event.target.files[0]);
      setFormData({ ...formData, media: { ...formData.media, logo: event.target.files[0].name } });
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setBannerFile(event.target.files[0]);
      setFormData({ ...formData, media: { ...formData.media, banner: event.target.files[0].name } });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith('address.')) {
      const fieldName = name.split('.')[1];
      setFormData({
        ...formData,
        address: { ...formData.address, [fieldName]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    const data = new FormData();
    data.append('name_bn', formData.name_bn);
    data.append('name_en', formData.name_en);
    data.append('description', formData.description);
    data.append('opening_hours', formData.opening_hours);
    data.append('closing_hours', formData.closing_hours);
    data.append('shop_status', formData.shop_status);
    data.append('address', formData.address.address);
    data.append('region', formData.address.region);
    data.append('city', formData.address.city);
    data.append('zone', formData.address.zone);

    // Append files
    if (logoFile) {
      data.append('logo', logoFile);
    }
    if (bannerFile) {
      data.append('banner', bannerFile);
    }

    // Now you can send `data` to the server
  
  };

  const selectedRegion = geo.regions.find((x) => x.name === formData.address.region);
  const cities = selectedRegion ? selectedRegion.cities : [];
  const selectedCity = cities.find((x) => x.name === formData.address.city);
  const zones = selectedCity ? selectedCity.zones : [];

  console.log(formData);

  return (
    <form className="space-y-6 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Store Settings</h2>

      <div>
        <label htmlFor="name_bn" className="block text-sm font-medium text-gray-600">Store Name (Bengali)</label>
        <input id="name_bn" name='name_bn' onChange={handleInputChange} value={formData.name_bn} type="text" placeholder="Enter store name in Bengali" className="mt-1 block w-full px-3 py-2 text-gray-600 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label htmlFor="name_en" className="block text-sm font-medium text-gray-600">Store Name (English)</label>
        <input id="name_en" name='name_en' onChange={handleInputChange} value={formData.name_en} type="text" placeholder="Enter store name in English" className="mt-1 block w-full px-3 py-2 bg-white border text-gray-600 text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Store Description</label>
        <textarea id="description" name='description' onChange={handleInputChange} value={formData.description} rows={3} placeholder="Enter store description" className="mt-1 block w-full px-3 py-2 bg-white text-gray-600 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
      </div>

      <div>
        <label htmlFor="address.address" className="block text-sm font-medium text-gray-600">Street Address</label>
        <input id="address.address" name='address.address' onChange={handleInputChange} value={formData.address.address} type="text" placeholder="Enter street address" className="mt-1 block w-full px-3 text-gray-600 text-sm py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
      </div>



      {/* address select */}
<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

      <div>
        <label htmlFor="address.region" className="block text-sm font-medium text-gray-700">Region</label>
        <select id="address.region" name='address.region' onChange={handleInputChange} value={formData.address.region} className="mt-1 block w-full px-4 border outline-none border-gray-300 py-2 text-sm text-gray-700  rounded-md">
          <option value="">Select a region</option>
          {geo.regions.map((region) => (
            <option key={region.name} value={region.name}>{region.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">City</label>
        <select id="address.city" name='address.city' disabled={!formData.address.region} onChange={handleInputChange} value={formData.address.city} className="mt-1 block w-full px-4 border outline-none border-gray-300 py-2 text-sm text-gray-700  rounded-md">
            
          <option value="">Select a city</option>
          {cities.map((city) => (
            <option key={city.name} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="address.zone" className="block text-sm font-medium text-gray-700">Zone</label>
        <select id="address.zone" name='address.zone' onChange={handleInputChange} disabled={!formData.address.city} value={formData.address.zone} className="mt-1 block w-full px-4 border outline-none border-gray-300 py-2 text-sm text-gray-700 rounded-md">
          <option value="">Select a zone</option>
          {zones.map((zone, i) => (
            <option key={i} value={zone}>{zone}</option>
          ))}
        </select>
      </div>
</div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="opening_hours" className="block text-sm font-medium text-gray-700">Opening Hours</label>
          <input id="opening_hours" name='opening_hours' onChange={handleInputChange} value={formData.opening_hours} type="text" placeholder="e.g. 9:00 AM" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-sm text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div>
          <label htmlFor="closing_hours" className="block text-sm font-medium text-gray-700">Closing Hours</label>
          <input id="closing_hours" name='closing_hours' onChange={handleInputChange} value={formData.closing_hours} type="text" placeholder="e.g. 5:00 PM" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 text-sm text-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>

      <div>
        <label htmlFor="shop_status" className="block text-sm font-medium text-gray-700">Shop Status</label>
        <select id="shop_status" name='shop_status' onChange={handleInputChange} value={formData.shop_status} className="mt-1 block w-full px-4 border border-gray-300 py-2 text-sm outline-none text-gray-700 rounded-md">
          <option value="">Select shop status</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>
{/* Logo */}
      <div>
        <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Store Logo</label>
       
        <input id="banner" type="file" onChange={handleLogoUpload} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        {
            logoFile ? (
                <div>
                     <img
                src={URL.createObjectURL(logoFile)}
                alt=""
                className="mr-4 border shadow-sm my-4 max-w-32 max-h-32 rounded-full"
              />
                </div>
            ):
            ''
        }

        <span className='text-sm text-red-400'>* Recommended image resolution: 600 x 600 pixel</span>
        <span className="text-sm block text-blue-500 mt-1">* The logo will represent your brand across the platform. Make sure it's clear and recognizable.</span>
      </div>

{/* Banner */}
      <div>
        <label htmlFor="banner" className="block text-sm font-medium text-gray-700">Store banner</label>
       
        <input id="banner" type="file" onChange={handleBannerUpload} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        {
            bannerFile ? (
                <div>
                     <img
                src={URL.createObjectURL(bannerFile)}
                alt=""
                className="mr-4 border shadow-sm my-4 w-80 max-h-58"
              />
                </div>
            ):
            ''
        }

        <span className='text-sm text-red-400'>* Recommended image resolution: 1440 x 900 pixel</span>
        <span className="text-sm block text-blue-500 mt-1">* The Product Details Page banner brings more traffic to your store and guide customers to browse more products in your store.</span>
      </div>

      <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none ">
        Save Settings
      </button>
    </form>
  );
}
