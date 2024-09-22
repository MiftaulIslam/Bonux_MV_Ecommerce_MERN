import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { geo } from "../../static/geoBd";
import { showAlert } from "../../utils/showAlert";
import { PutService } from "../../utils/HTTP/Put";
import { useLoader } from "../../hooks/LoaderProvider";
import { fetchUser } from "../../state/actions/userAction";
import { useNavigate, useNavigation } from "react-router-dom";

const ManageAddresses = () => {
  const { user, loading } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {showLoader, hideLoader}=useLoader()
  const [isAdd, setIsAdd] = useState(false);
  const [type, settype] = useState({
    id:'',
    type:''
  });
  const [formData, setFormData] = useState({
    region: "",
    city: "",
    zone: "",
    address: "",
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
        [name]: "Field required",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };
  const [isSelectingShipping, setIsSelectingShipping] = useState(false);
  const [isSelectingBilling, setIsSelectingBilling] = useState(false);

  const [defaultShippingId, setDefaultShippingId] = useState(null);
  const [defaultBillingId, setDefaultBillingId] = useState(null);'
  
  
  
  useEffect(() => {
    const shippingAddress = user.addresses.find(address => address.defaultShipping);
    const billingAddress = user.addresses.find(address => address.defaultBilling);
    setDefaultShippingId(shippingAddress ? shippingAddress._id : null);
    setDefaultBillingId(billingAddress ? billingAddress._id : null);
  }, []);



  const handleSelect = (e)=>{
    if(e.target.name == 'billing'){
      setDefaultBillingId(e.target.value)
      settype({id:e.target.value, type:'billing'})
    }else{
      setDefaultShippingId(e.target.value)
      settype({id:e.target.value, type:'shipping'})
      }
  }


  const handleSubmit = async () => {
    const newErrors = {
      region: !formData.region ? "Field required" : "",
      city: !formData.city ? "Field required" : "",
      zone: !formData.zone ? "Field required" : "",
      address: !formData.address ? "Field required" : "",
    };

    setErrors(newErrors);

    if (formData.address && formData.region && formData.city && formData.zone) {
      const formDataToSend = new FormData();
      formDataToSend.append("address", formData.address);
      formDataToSend.append("region", formData.region);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("zone", formData.zone);
      showLoader()
      const data = await PutService("user/add-address", true, formDataToSend);
      if(data)dispatch(fetchUser());
      hideLoader()
      setIsAdd(false)
    } else {
      setIsAdd(false)
      hideLoader()
      showAlert(false, "All fields are required");
    }
  };

  
const handleSelectSubmit =async ()=>{
  const formDataToSend = new FormData();
  formDataToSend.append("type",type.type)
  try {
    showLoader()
    const data = await PutService(`user/update-paymentaddress/${type.id}`, true, formDataToSend)
    if(data) {dispatch(fetchUser());  navigate('/user')}
    hideLoader();
  } catch (error) {
    hideLoader();
  }
}




  const selectedRegion = geo.regions.find((x) => x.name === formData.region);
  const cities = selectedRegion ? selectedRegion.cities : [];
  const selectedCity = cities.find((x) => x.name === formData.city);
  const zones = selectedCity ? selectedCity.zones : [];



  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{(isSelectingBilling && !isSelectingShipping)? "Make default selecting billing address":""} {(isSelectingShipping&&!isSelectingBilling) ?"Make default selecting shipping address":""} {(!isSelectingBilling&&!isSelectingShipping)&&"Address book" }</h1>
        <div className="space-x-4">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={()=>{setIsSelectingBilling(false); setIsSelectingShipping(!isSelectingShipping)}}
          >
            Make default shipping address
          </button>
          <span className="text-gray-300">|</span>
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={()=>{setIsSelectingBilling(!isSelectingBilling); setIsSelectingShipping(false)}}
          >
            Make default billing address
          </button>
        </div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="p-4 flex flex-col justify-between">
          {/* If no addresses foud then show the p tag else show the addresses as horizontal card */}
          {user.addresses.length === 0 && !isAdd ? (
            <p className="mb-28">Save your shipping & billing address here</p>
          ) : (
            <>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 font-semibold w-1/4 text-gray-600">
                      Address
                    </th>
                    <th className="text-left py-2 font-semibold w-1/4 text-gray-600">
                      Postcode
                    </th>
                    <th className="text-left py-2 font-semibold w-1/4 text-gray-600">
                      Phone Number
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {user?.addresses.map((address) => (
                    <tr key={address._id}>
                      <td className="py-4">{address.address}</td>

                      <td className="py-4">{` ${address.region}-${address.city}-${address.zone}`}</td>
                      <td className="py-4">{user?.phone}</td>
                      <td className="py-4">
                        {isSelectingShipping && (
                          <div className="flex items-center">
                            <input
                              type="radio"
                              id={`shipping-${address._id}`}
                              name="shipping"
                              
                              value={address._id}
                              checked={defaultShippingId == address._id}
                              onChange={handleSelect
                              }
                              className="mr-2"
                            />
                            <label htmlFor={`shipping-${address._id}`}>
                              Default Shipping
                            </label>
                          </div>
                        )}
                        {isSelectingBilling && (
                          <div className="flex items-center mt-2">
                            <input
                              type="radio"
                              id={`billing-${address._id}`}
                              name="billing"
                              value={address._id}
                              checked={defaultBillingId == address._id}
                              onChange={handleSelect}
                              className="mr-2"
                            />
                            <label htmlFor={`billing-${address._id}`}>
                              Default Billing
                            </label>
                          </div>
                        )}
                        <button className="text-blue-600 hover:text-blue-800 mt-2">
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {
                (isSelectingBilling || isSelectingShipping) &&(
                  <div>
                  <button
                    type="button"
                    onClick={handleSelectSubmit}
                    className="w-full sm:w-auto py-2 px-4 shadow-sm text-sm duration-300 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    SAVE
                  </button>
                  <button
                    type="button"
                    onClick={()=> isSelectingShipping?setIsSelectingShipping(!isSelectingShipping):setIsSelectingBilling(!isSelectingBilling)}
                    className="w-full sm:w-auto mx-2 py-2 px-4 shadow-sm text-sm duration-300 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Cancel
                  </button>
                </div>
                )
              }
            </>
          )}

          {/* Add section */}
          {isAdd && (
            <div className="p-6">
              <div className="grid py-2 grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6 sm:gap-y-12">
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
                  className="w-full sm:w-auto py-2 px-4 shadow-sm text-sm duration-300 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  SAVE PROFILE
                </button>

                <button
                  type="button"
                  onClick={() => setIsAdd(false)}
                  className="w-full sm:w-auto py-2 px-4 shadow-sm text-sm duration-300 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
          {/* Add new address button */}
          {!isAdd && (
            <div className="text-right">
              <button
                type="button"
                onClick={() => setIsAdd(true)}
                className="bg-blue-600 rounded px-4 py-2 text-white hover:bg-blue-700 duration-300"
              >
                + Add new address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;


