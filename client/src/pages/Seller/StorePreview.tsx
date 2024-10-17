import  {  useRef, useState } from "react";
import Loader from "../../widgets/Loader";
import { useDispatch, useSelector } from "react-redux";
import { default_src, imageValidTypes } from "../../static/data";
import EmailIcon from "../../widgets/icons/EmailIcon";
import PhoneIcon from "../../widgets/icons/PhoneIcon";
import InfoCardIcon from "../../widgets/icons/InfoCardIcon";
import DescriptionIcon from "../../widgets/icons/DescriptionIcon";
import StatusIcon from "../../widgets/icons/StatusIcon";
import ClockIcon from "../../widgets/icons/ClockIcon";
import { showAlert } from "../../utils/showAlert";
import { useNavigate } from "react-router-dom";
import ImageIcon from "../../widgets/icons/ImageIcon";
import AddressIcon from "../../widgets/icons/AddressIcon";
import { updateStore } from "../../state/actions/storeAction";
import StoreInfoModal from "../../components/Store/StoreInfoModal";
import { AppDispatch, RootState } from "../../state/store/store";

const StorePreview = () => {
  const disptach = useDispatch<AppDispatch>()
const coverInputClick = useRef<any>(null)
const logoInputClick = useRef<any>(null)
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState("Back");
  const [isEdit, setisEdit] = useState(false);
  
  const { user } = useSelector((state:RootState) => state.user);
  const { loading, store } = useSelector((state:RootState) => state.store);
  // const [formData, setFormData] = useState({
  //   name: store?.name || "",
  //   description: store?.description || "",
  //   address: store?.address.address || "",
  //   region: store?.address.region || "",
  //   city: store?.address.city || "",
  //   zone: store?.address.zone || "",
  //   status: store?.status || "",
  //   openingHours: store?.openingHours || "",
  //   closingHours: store?.closingHours || "",
  // });
  const About = () => {
    return (
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-xl font-bold text-gray-600 mb-4">About</h2>

        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-3">
            <span>
              <EmailIcon width={"20"} height={"20"} />
            </span>
            {user.email}
          </p>

          <p className="flex items-center gap-3">
            <span>
              <PhoneIcon width={"20"} height={"20"} />
            </span>
            {user?.phone}
          </p>

          <p className="flex items-center gap-3">
            <span>
              <InfoCardIcon width={"20"} height={"20"} />
            </span>
            {store?.name}
          </p>

          <p className="flex items-start gap-3 ">
            <span>
              <DescriptionIcon width={"20"} height={"20"} />
            </span>
            {store?.description.slice(0, 120)}
            {store?.description.length > 120 ? "..." : ""}
          </p>

          <p className="flex items-center gap-3 ">
            <span>
              <StatusIcon width={"20"} height={"20"} />
            </span>
            {store?.shop_status.charAt(0).toUpperCase() +
              store.shop_status.slice(1)}
          </p>

          <p className="flex items-center gap-3 ">
            <span>
              <ClockIcon width={"20"} height={"20"} />
            </span>
            {store?.opening_hours} - {store?.closing_hours}
          </p>
          <p className="flex items-center gap-3 ">
            <span>
              <AddressIcon width={"20"} height={"20"} />
            </span>
           {store?.address.zone}, {store?.address.city},  {store?.address.region} 
          </p>
        </div>
      </div>
    );
  };
  const Reviews = () => {
    return (
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        <p className="text-gray-600">User reviews would be listed here.</p>
      </div>
    );
  };

  const Products = () => {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <p className="text-gray-600">User products would be displayed here.</p>
      </div>
    );
  };

  if (loading) return <Loader />;
  if(!store) {
    showAlert(false, "You haven't create any store yet");
    navigate("/seller")
  }
  const handleCoverChange = async (event:any) => {
    const formDataToSend = new FormData();
    const file = event.target.files[0];
    formDataToSend.append("media", file);
    // const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if(file && imageValidTypes.includes(file.type)){
      
      disptach(updateStore(`store/update-media/${store?._id}?type=banner`, formDataToSend))
    }else{
      console.error('Invalid image type')
    }
  }
  const handleLogoChange = async (event:any) => {
    const formDataToSend = new FormData();
    const file = event.target.files[0];
    formDataToSend.append("media", file);
    const validTypes = ["image/jpeg", "image/png", "image/jpg"]
    if(file && validTypes.includes(file.type)){
      disptach(updateStore(`store/update-media/${store?._id}?type=logo`, formDataToSend))
      
    }else{
      console.error('Invalid image type')
    }
  }

  return (
    <div className="bg-gray-100 w-full min-h-screen">
     {isEdit && <StoreInfoModal onClose={()=> setisEdit(!isEdit)}/>}
      {/* Cover Photo */}
      <div className="relative w-full h-44 sm:h-80  bg-gray-300">
        <img
          className="w-full h-full object-cover object-center"
          src={`${default_src}${store?.media.banner}`}
          alt={store.name}
        />
        <button
        onClick={() => coverInputClick.current?.click()}
          type="button"
          className="flex justify-center items-center gap-2 absolute bottom-4 right-4 bg-white text-black px-4 py-2 rounded-md text-sm"
        ><ImageIcon width={17} height={17}/>
          Edit cover photo
        </button>
        
        <input
        placeholder="Insert banner"
          type="file"
          ref={coverInputClick}
          onChange={handleCoverChange}
          className="absolute bottom-4 right-4  cursor-pointer hidden w-36 h-9 opacity-0"
        />

      </div>

      {/* Profile Section */}
      <div className="max-w-5xl px-2  mx-auto relative -mt-16">
        <div className="sm:flex  sm:items-end sm:space-x-5">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white bg-gray-300 ">
         
            <img
            
               onClick={() => logoInputClick.current?.click()}
              className="w-full absolute top-0 left-0 h-full cursor-pointer rounded-full object-cover object-center"
              src={`${default_src}${store?.media.logo}`}
              alt={store.name}
            />
            <span 
               onClick={() => logoInputClick.current?.click()} className="duration-300 hover:cursor-pointer bg-gray-200 border  shadow
               rounded-full w-10 h-10
               flex justify-center items-center absolute bottom-0 right-0  "><ImageIcon width={20} height={20}/></span>
            <input placeholder="Insert logo" ref={logoInputClick} onChange={handleLogoChange} className="hidden" type="file" name="logo" id="logo" />
        
            
          </div>

          {/* Name */}
          <div className=" sm:flex-1 pb-4 space-y-4 sm:space-y-0 sm:flex  sm:items-center ">
            <div className=" block flex-1">
              <h1 className="text-2xl font-bold text-gray-900 ">
                {store.name}
              </h1>
            </div>
            <div className="flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 shadow-sm focus:outline-none"
                onClick={()=> setisEdit(!isEdit)}
              >
                Edit profile
              </button>
         
              {/* {isEdit && <Modal action={"edit"} modalLabel={"Edit info"} isOpen={isEdit} onClose={()=>setisEdit(false)} onSubmit={undefined} input={undefined} data={undefined}/>} */}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="  mt-6 border-t border-gray-200 sticky top-0 bg-white z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap -mb-px" aria-label="Tabs">
            {["About","Products", "Reviews", "Back"].map((item) => (
              <button
                key={item}
                onClick={() => setSelectedItem(item)}
                className={`${
                  item === selectedItem
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm mr-8 mb-2`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          className={`${
            selectedItem == "Back" ? "sm:grid-cols-3" : ""
          } grid  grid-cols-1  gap-6`}
        >
          {selectedItem == "About" && (
            <div className="lg:col-span-1">
              <About />
            </div>
          )}
          {selectedItem == "Reviews" && (
            <div className="lg:col-span-1">
              <Reviews />
            </div>
          )}

          {selectedItem == "Products" && (
            <div className="lg:col-span-1">
              <Products />
            </div>
          )}

          {selectedItem == "Back" && (
            <>
              {/* Left Sidebar */}
              <div className="lg:col-span-1">
                <About />
              </div>

              {/* Main Content */}
              <div className="lg:col-span-2">
                <Reviews />
                <Products />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePreview;
