import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLoader } from "../../hooks/LoaderProvider";
import { updateUser, fetchUser } from "../../state/actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import { Modal } from "../../widgets";
import { DeleteService } from "../../utils/HTTP/Delete";
import { UserAddress } from "../../models/StateType";
import { AppDispatch, RootState } from "../../state/store/store";

const ManageAddresses = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useLoader();
  
  const [type, setType] = useState({
    id: "",
    type: "",
  });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSelectingShipping, setIsSelectingShipping] = useState(false);
  const [isSelectingBilling, setIsSelectingBilling] = useState(false);

  const [defaultShippingId, setDefaultShippingId] = useState<string | number | null>(null);
  const [defaultBillingId, setDefaultBillingId] = useState<string | number | null>(null);

  useEffect(() => {
    const shippingAddress = user.addresses.find(
      (address: UserAddress) => address.defaultShipping
    );
    const billingAddress = user.addresses.find(
      (address: UserAddress) => address.defaultBilling
    );

    setDefaultShippingId(shippingAddress ? shippingAddress._id : null);
    setDefaultBillingId(billingAddress ? billingAddress._id : null);
  }, [user.addresses]);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "billing") {
      setDefaultBillingId(e.target.value);
      setType({ id: e.target.value, type: "billing" });
    } else {
      setDefaultShippingId(e.target.value);
      setType({ id: e.target.value, type: "shipping" });
    }
  };

  const handleSelectSubmit = async () => {
    // const formDataToSend = new FormData();
    // formDataToSend.append("type", type.type);
    try {
      showLoader();
      await dispatch(updateUser(`user/update-paymentaddress/${type.id}?type=${type.type}`));
      navigate("/user");
    } catch (error) {
      console.error(error);
    } finally {
      hideLoader();
    }
  };
  const deleteAddress = async (id: string) => {
    showLoader();
    const data = await DeleteService(`user/delete-address/${id}`, true);
    if (data.ok) {
      
    dispatch(fetchUser()) ;
    }
    hideLoader();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-900">
          {isSelectingBilling && !isSelectingShipping
            ? "Make default selecting billing address"
            : ""}
          {isSelectingShipping && !isSelectingBilling
            ? "Make default selecting shipping address"
            : ""}
          {!isSelectingBilling && !isSelectingShipping && "Address book"}
        </h1>
        {user.addresses.length !== 0 && (
          <div className="space-x-2 text-right ">
            <button
              type="button"
              className="text-xs text-gray-700 block sm:inline-block hover:text-blue-800"
              onClick={() => {
                setIsSelectingBilling(false);
                setIsSelectingShipping(!isSelectingShipping);
              }}
            >
              Make default shipping address
            </button>
            <span className="text-gray-800 hidden sm:inline-block">|</span>
            <button
              type="button"
              className="text-gray-700 text-xs hover:text-blue-800"
              onClick={() => {
                setIsSelectingBilling(!isSelectingBilling);
                setIsSelectingShipping(false);
              }}
            >
              Make default billing address
            </button>
          </div>
        )}
      </div>
      <div className="bg-white shadow overflow-x-auto sm:rounded-lg">
        <div className="p-2 px-4 ">
          {user.addresses.length === 0 ? (
            <p className="mb-28">Save your shipping & billing address here</p>
          ) : (
            <>
              <table className="w-full p-2 overflow-x-auto">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-sm font-semibold w-1/4 text-gray-800">
                      Address
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-semibold w-1/4 text-gray-800">
                      Postcode
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-semibold w-1/4 text-gray-800">
                      Phone Number
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-semibold w-1/4 text-gray-800">
                      Manage
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {user.addresses.map((address:UserAddress) => (
                    <tr key={address._id} className="border-b">
                      <td className="text-sm py-2 px-3 text-gray-600 ">
                        {address.address}
                      </td>

                      <td className="text-sm py-2 px-3 text-gray-600">{`${address.region}-${address.city}-${address.zone}`}</td>
                      <td className="text-sm py-2 px-3 text-gray-600">
                        {user.phone}
                      </td>
                      <td className="">
                        {isSelectingShipping && (
                          <div className="flex text-sm items-center">
                            <input
                              type="radio"
                              id={`shipping-${address._id}`}
                              name="shipping"
                              value={address._id}
                              checked={defaultShippingId === address._id}
                              onChange={handleSelect}
                              className="mr-2"
                            />
                            <label htmlFor={`shipping-${address._id}`}>
                              Default Shipping
                            </label>
                          </div>
                        )}
                        {isSelectingBilling && (
                          <div className="flex text-sm items-center mt-2">
                            <input
                              type="radio"
                              id={`billing-${address._id}`}
                              name="billing"
                              value={address._id}
                              checked={defaultBillingId === address._id}
                              onChange={handleSelect}
                              className="mr-2"
                            />
                            <label htmlFor={`billing-${address._id}`}>
                              Default Billing
                            </label>
                          </div>
                        )}
                        {!isSelectingBilling && !isSelectingShipping && (
                          <div className="flex flex-wrap gap-2">
                            <Link
                              to={`edit?id=${address._id}`}
                              className="text-blue-600 hover:text-blue-700 hover:underline "
                            >
                              Edit
                            </Link>
                            <button
                            type="button"
                              onClick={() => setIsDeleteModalOpen(true)}
                              className="text-blue-600 hover:text-blue-700 hover:underline"
                            >
                              Delete
                            </button>

                            {isDeleteModalOpen && (
                              <Modal
                                action="delete"
                                modalLabel={"Address"}
                                isOpen={isDeleteModalOpen}
                                onClose={() => setIsDeleteModalOpen(false)}
                                onSubmit={() => deleteAddress(address._id)}
                                data={address}
                              />
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {(isSelectingBilling || isSelectingShipping) && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={handleSelectSubmit}
                    className="w-full sm:w-auto mr-2 py-2 px-6 shadow-sm text-xs duration-300 font-medium rounded-md inline-block border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      isSelectingShipping
                        ? setIsSelectingShipping(!isSelectingShipping)
                        : setIsSelectingBilling(!isSelectingBilling)
                    }
                    className="w-full sm:w-auto mr-2 my-2 py-2 px-6 shadow-sm text-xs duration-300 font-medium rounded-md inline-block border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}

          {/* Add new address button */}
          <div className="text-right">
            <Link
              to={"add"}
              className="w-full sm:w-auto mr-2 my-2 py-2 px-6 shadow-sm text-sm duration-300 font-medium text-center rounded-md inline-block border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
            >
              + Add new address
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageAddresses;
