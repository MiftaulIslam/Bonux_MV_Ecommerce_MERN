import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLoader } from '../../hooks/LoaderProvider';
import { maskEmail } from '../../utils/MaskEmail';
import { updateUser } from '../../state/actions/userAction';
import { AppDispatch, RootState } from '../../state/store/store';

const MyProfile = () => {
    const { showLoader, hideLoader } = useLoader();
    const dispatch = useDispatch<AppDispatch>()
    const { user, loading } = useSelector((state:RootState) => state.user);
    
    const [formData, setFormData] = useState({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
    });
  
    const [image, setImage] = useState<File | null>(null);
    const [changeImage, setChangeImage] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
  
    // Side effect to handle loader based on 'loading' state
    useEffect(() => {
      if (loading) {
        showLoader();
      } else {
        hideLoader();
      }
    }, [loading]);
  
    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setImage(e.target.files[0]);
      } else {
        alert('Photo is not valid');
      }
    };
  
    const handleSubmit = async (e:any) => {
      e.preventDefault();
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('gender', formData.gender);
      if (image) {
        formDataToSend.append('avatar', image);
      }
      showLoader();
        dispatch(updateUser('user/update-info', formDataToSend))
      hideLoader();
    };
  
  return (
  <div>
    <h2 className="text-2xl font-bold mb-6">My profile</h2>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg  py-14">
        <div className="px-4 py-5 sm:p-6">
          <div className="space-y-6">
           <div className='grid py-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-x-3  gap-y-6 sm:gap-y-12'>
           <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="name"
                id="fullName"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 block w-full border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isEditing ? '' : 'bg-gray-100'}`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address |{" "}<a className=' text-xs text-blue-400' href="#">Change</a></label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={maskEmail( formData.email)}
                  onChange={handleInputChange}
                  disabled={true}
                  className={`flex-1 block w-full border 'border-gray-300' bg-gray-100 'border-transparent'  rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm `}
                />
              </div>
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">Mobile | <button onClick={()=> setIsEditing(!isEditing)} className='text-xs text-blue-400'  type='button'>Add</button> </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="phone"
                  id="mobile"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Please enter your mobile"
                  className={`flex-1 block w-full border ${isEditing ? 'border-gray-300' : 'border-transparent'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${isEditing ? '' : 'bg-gray-100'}`}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border ${isEditing ? 'border-gray-300' : 'border-transparent'} focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md ${isEditing ? '' : 'bg-gray-100'}`}
              >
                <option value="">Please select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {/* image */}
            <div className={` ${changeImage ? "flex  items-end space-x-4" : ""}`}>
             {!changeImage && <label className='block text-sm font-medium text-gray-700' htmlFor="#">Image | <button type='button' onClick={()=> setChangeImage(true)} className='text-xs text-blue-400'  >Change</button></label>}
          {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="mr-4 max-w-[50px] "
              />
            ) : (
              <img
                src={`	data:image/jpeg;base64,${user.avatar}`}
                alt={user.name}
                className="mr-1 max-w-[50px] "
              />
            )}{changeImage &&
              <input
              placeholder='Insert image'
              type="file"
              id='image'
              accept=".jpeg, .jpg, .png"
              className=""
              onChange={handleFileInputChange}
              />}
             
            
          </div>
           </div>
           
          </div>
           <div className="flex flex-col mt-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  SAVE PROFILE
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  EDIT PROFILE
                </button>
              )}
              <button
                type="button"
                className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                CHANGE PASSWORD
              </button>
            </div>
        </div>
      </div>
  </div>
  )
}

export default MyProfile