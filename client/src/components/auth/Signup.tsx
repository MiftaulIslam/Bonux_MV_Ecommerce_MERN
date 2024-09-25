import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
// Input validation functions
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../../utils/validation/validation";

// Type validation model
import { SignupModel } from "../../models/auth";
// Default Image
import { no_user_image } from "../../utils/logo";
// Post Request Service 
import { PostService } from "../../utils/HTTP/Post";
import { useLoader } from "../../hooks/LoaderProvider";

const Signup = ({role}) => {
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  //Handling Form Data
  const [formData, setFormData] = useState<SignupModel>({
    name: "",
    email: "",
    password: "",
    phone:"",
    avatar: null,
  });

  //Handling errors
  const [errors, setErrors] = useState<{email:string, password:string, phone:string}>({ email: "", password: "", phone:"" });
  
  //Mouse click outside of input event
  const [touched, setTouched] = useState<{email:boolean, password:boolean, name:boolean, phone:boolean}>({
    name: false,
    email: false,
    password: false,
    phone:false
  });

  //Manipulating Form Data
  const handleChange = (e:   ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Manipulating Error comes under the input
  const handleBlur = (e:   FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    switch(name){
      case 'phone':
        setErrors({
          ...errors, phone:validatePhone(formData.phone)
        });
        break
      case 'email':
        setErrors({
          ...errors, email: validateEmail(formData.email)
        });
        break
      case 'password':
        setErrors({
         ...errors, password: validatePassword(formData.password)
        })
        break
      
    }
  };

  //Handling File upload
  const handleFileInputChange = (e:   ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      alert("Photo is not valid");
    }
  };

  //Handling Submit
  const handleSubmit = async (e:   FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errors.email && !errors.email && formData.name && !errors.phone) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if(role ==='seller'){
        formDataToSend.append('phone', formData.phone)
      }
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }
      try{
        showLoader();
        const data = await PostService( role==='seller'?"seller/seller-signup": "user/register" , true, formDataToSend);
        hideLoader()

      }catch(err){
        hideLoader()

      }
      
      console.log(data)
    }
  };

  return (

      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full  bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your {role} account
          </h2>
          <p className="mt-2 text-center text-sm text-blue-100">
            Or{' '}
            {role==='seller'?(<Link to="/login?role=seller" className="font-medium text-blue-300 hover:text-white">
              sign in to your existing account
            </Link>):(
            <Link to="/login" className="font-medium text-blue-300 hover:text-white">
              sign in to your existing account
            </Link>)}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none  sm:text-sm"
                placeholder="Full Name"
                value={formData.name}
                
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded relative block w-full px-3 py-3  border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-3 rounded border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none  sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            {
              role === 'seller'?(
                <div className="relative">
              <label htmlFor="phone" className="sr-only">
                Phone number
              </label>
              <input
                id="phone"
                name="phone"
                type="string"
                autoComplete="phone"
                required
                className="appearance-none relative block w-full px-3 py-3 rounded border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none  sm:text-sm"
                placeholder="Phone number"
                value={formData.phone}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
              ) :" "
            }
            
          </div>

          <div className="flex  items-center">
          {formData.avatar ? (
              <img
                src={URL.createObjectURL(formData.avatar)}
                alt=""
                className="mr-4 max-w-[50px] rounded-full"
              />
            ) : (
              <img
                src={no_user_image}
                alt=""
                className="mr-1 max-w-[70px] rounded-full"
              />
            )}
              <input
                type="file"
              accept=".jpeg, .jpg, .png"
                className=""
              onChange={handleFileInputChange}
              />
             
            
          </div>

          {errors.email && (
            <div className="text-white text-sm  bg-red-500 bg-opacity-20 p-2 rounded">{errors.email}</div>
          )}
          {errors.password && (
            <div className="text-white text-sm  bg-red-500 bg-opacity-20 p-2 rounded">{errors.password}</div>
          )}
          {errors.phone && (
            <div className="text-white text-sm  bg-red-500 bg-opacity-20 p-2 rounded">{errors.phone}</div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Sign up
            </button>
          </div>
        </form>
        <div className="text-center">
          {role === 'user' ? (

<p className="text-sm text-blue-100 my-2">
Want to be a seller? <Link className="font-medium text-[#ddd] hover:text-white" to={"/signup?role=seller"}>Click here
</Link></p>
          ):""}
          <p className="text-sm text-blue-100 my-2">
            By signing up, you agree to our{' '}
            <Link to="#" className="font-medium text-[#ddd] hover:text-white">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="#" className="font-medium text-[#ddd] hover:text-white">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>



















  );
};

export default Signup;
