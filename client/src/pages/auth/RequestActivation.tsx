import { useState, FormEvent, FocusEvent, ChangeEvent } from 'react';
// Input validation function
import { validateEmail } from '../../utils/validation/validation';

// Show Alert function
import { showAlert } from '../../utils/showAlert';
// Post request service
import { PostService } from '../../utils/HTTP/Post';
import { Link, useLocation } from 'react-router-dom';
import { useLoader } from '../../hooks/LoaderProvider';

// Utility to parse query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const RequestActivation = () => {
  const query = useQuery();
  const role = query.get("role") || "user"; // Default role is 'user'
  
  const {showLoader, hideLoader}=useLoader()
  // Handling Form Data
  const [formData, setFormData] = useState<{ email: string }>({ email: "" });
  const [touched, setTouched] = useState<{ email: boolean }>({ email: false });
  const [errors, setErrors] = useState<{ email: string }>({ email: "" }); // Removed password field

  // Handling error validation on blur
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({
      ...errors,
      email: validateEmail(formData.email),
    });
  };

  // Handling input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit request for activation
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If no errors, submit the form
    if (!errors.email) {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('role', role==='seller'? 'seller' : 'user');
        try {
         
        showLoader();
        await PostService("user/activate/request", true, formDataToSend);
        
        hideLoader()    
        showAlert(true, 'Activation link sent to your email');
       
        } catch (error) {
        hideLoader()    
        }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div>
          <h2 className="mt-4 text-center text-2xl font-extrabold text-white">
            Request for activation
          </h2>
        </div>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-2">
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
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div>
              {errors.email && touched.email && (
                <div className="text-white text-sm mt-2 bg-red-500 bg-opacity-20 p-2 rounded">
                  {errors.email}
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="text-center m-0">
            <p className="text-sm text-blue-100">
              Go back to{' '}
              <Link
                className="font-medium text-[#ddd] hover:text-white"
                to={`${role === 'seller' ? "/login?role=seller" : "/login"}`}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestActivation;
