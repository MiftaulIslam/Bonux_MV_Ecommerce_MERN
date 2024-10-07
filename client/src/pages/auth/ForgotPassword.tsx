import { useState, FormEvent, FocusEvent, ChangeEvent } from 'react'
// Input validation function
import { validateEmail } from '../../utils/validation/validation';
// Show alert function
import { showAlert } from '../../utils/showAlert';
// Post request service
import { PostService } from '../../utils/HTTP/Post';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  // Handling form data
    const [formData, setFormData] = useState<{ email: string, role:string }>({ email: "", role:"" });
    
  //Handling errors
    const [errors, setErrors] = useState<{email:string}>({ email: '' });
     
  //Mouse click outside of input event
    const [touched, setTouched] = useState<{email:boolean}>({ email: false });
    
  //Manipulating Error comes under the input
    const handleBlur = (e:   FocusEvent<HTMLInputElement>) => {
      const { name } = e.target;
      setTouched({ ...touched, [name]: true });
        setErrors({ ...errors, [name]: validateEmail(formData.email) });
      
    };
  
  //Manipulating Form Data
    const handleChange = (e:   ChangeEvent<HTMLInputElement>|ChangeEvent<HTMLSelectElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };  

    // Submit form
  const handleSubmit = async (e:   FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errors.email) {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('role', formData.role);
      try {
        await PostService('user/forgot-password', true, formDataToSend)
      } catch (err) {
        showAlert(false,'Something went wrong')
      }
    }
  };

  return (
   
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-white">
            Enter your email to reset your password
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
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
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none  sm:text-sm"
                placeholder="Email address"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.email}
              />
              {errors.email && (
                <span className="text-[#ffffff] py-1 inline-block text-sm">{errors.email}</span>
              )}
            </div>
            <div className="relative py-2">
              <label htmlFor="role" className="sr-only">
                Role
              </label>
              <select
                id="role"
                name="role"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none rounded sm:text-sm"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Reset Password
            </button>
          </div>
        </form>
        <div className="text-center">
          <Link to="/login" className="font-medium text-purple-200 hover:text-white transition duration-150 ease-in-out">
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>

  )
}

export default ForgotPassword