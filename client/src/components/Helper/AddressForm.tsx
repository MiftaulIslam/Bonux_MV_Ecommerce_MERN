import React, { ChangeEvent, useEffect, useState } from "react";
import { geo } from "../../static/geoBd";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PutService } from "../../utils/HTTP/Put";
import { useLoader } from "../../hooks/LoaderProvider";
import { fetchUser } from "../../state/actions/userAction";
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const AddressForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = useQuery();
  const id = query.get("id") || "";

  const { user, loading } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    address: "",
    region: "",
    city: "",
    zone: "",
  });
  const [errors, setErrors] = useState({
    region: "",
    city: "",
    zone: "",
    address: "",
  });

  const [touched, setTouched] = useState({
    region: false,
    city: false,
    zone: false,
    address: false,
  });
  
  useEffect(() => {
    if (id) {
        
  const address = user?.addresses.find((a) => a._id === id);
      if (address) {
        setFormData({
          address: address.address,
          region: address.region,
          city: address.city,
          zone: address.zone,
        });
      }
    }
  }, [loading]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });

    if (!value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name} field is required`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const selectedRegion = geo.regions.find((x) => x.name === formData.region);
  const cities = selectedRegion ? selectedRegion.cities : [];
  const selectedCity = cities.find((x) => x.name === formData.city);
  const zones = selectedCity ? selectedCity.zones : [];

  const { showLoader, hideLoader } = useLoader();
  const handleSubmit = async () => {
    if (formData.address && formData.city && formData.region && formData.zone) {
      showLoader();
      const formDataToSend = new FormData();
      formDataToSend.append("address", formData.address);
      formDataToSend.append("region", formData.region);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("zone", formData.zone);
      const data = await PutService(
        id ? `user/update-address/${id}` : `user/add-address`,
        true,
        formDataToSend
      );
      dispatch(fetchUser())
      hideLoader();
      if(data.ok){
        navigate("/user")
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <h1 className=" text-xl font-bold text-gray-900">{id?"Edit":"Add"} address</h1>
      {/* Form */}
      <div className="p-6 my-2 bg-white shadow sm:rounded-lg">
        <div className="grid py-2 grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6">
          {/* Address */}
          <div className="col-span-1 sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Please enter your address"
              value={formData.address}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={true}
              className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {touched.address && errors.address && !formData.address && (
              <p className="text-red-600 text-xs">{errors.address}</p>
            )}
          </div>
          {/* Region */}
          <div>
            <label
              htmlFor="region"
              className="block text-sm font-medium text-gray-700"
            >
              Region
            </label>
            <select
              name="region"
              id="region"
              value={formData.region}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={true}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Please select your region</option>
              {geo.regions.map((i) => (
                <option key={i.name} value={i.name}>
                  {i.name}
                </option>
              ))}
            </select>
            {touched.region && errors.region && (
              <p className="text-red-600 text-xs">{errors.region}</p>
            )}
          </div>
          {/* city */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              City
            </label>
            <select
              name="city"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={true}
              disabled={!formData.region}
              className="mt-1 block max-h-24 overflow-y-auto w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Please select your city</option>
              {cities.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {touched.city && errors.city && (
              <p className="text-red-600 text-xs">{errors.city}</p>
            )}
          </div>
          {/* zone */}
          <div>
            <label
              htmlFor="zone"
              className="block text-sm font-medium text-gray-700"
            >
              Zone
            </label>
            <select
              name="zone"
              id="zone"
              value={formData.zone}
              onChange={handleInputChange}
              onBlur={handleBlur}
              required={true}
              disabled={!formData.city}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Please select your zone</option>
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
            {touched.zone && errors.zone && (
              <p className="text-red-600 text-xs">{errors.zone}</p>
            )}
          </div>
        </div>
        {/* form buttons */}
        <div className="flex flex-col mt-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full sm:w-auto py-2 px-6 text-xs shadow-sm duration-300 font-medium rounded-md hover:text-white hover:bg-blue-600 border border-blue-600 text-blue-600 "
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto py-2 px-6 text-xs shadow-sm  duration-300 font-medium rounded hover:text-white hover:bg-red-600 border border-red-600 text-red-600"
          >
            Back
          </button>
        </div>
      </div>
      

    </div>
  );
};

export default AddressForm;
