import { useState, FocusEvent, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

// input validation function
import { validateConfirmPassword, validatePassword } from "../../utils/validation/validation";
// Post request service
import { PostService } from "../../utils/HTTP/Post";

const ConfirmPassword = () => {
  const navigate = useNavigate()
  // Handling form data
  const [formData, setFormData] = useState<{ password: string, confirmPassword:string }>({
    password: "",
    confirmPassword: "",
  });
  // Handling Errors
  const [errors, setErrors] = useState<{ password: string,confirmPassword:string, match:(boolean|null) }>({ password: "", confirmPassword: "", match: null});

  //Mouse click outside of input event
  const [touched, setTouched] = useState<{ password: boolean, confirmPassword:boolean }>({
    password: false,
    confirmPassword: false,
  });

  // Token coming from URL
  const { token } = useParams();

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: name==='password'? validatePassword(formData.password) : validatePassword(formData.confirmPassword) });
  };

  //Manipulating Form Data
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Manipulating Error comes under the input
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validatePasswords = validateConfirmPassword(formData.password, formData.confirmPassword)
    if(validatePasswords) {setErrors({...errors, match:false})}else{setErrors({...errors, match:true})}
    if (!errors.password && !errors.confirmPassword && errors.match) {
      const formDataToSend = new FormData();
      formDataToSend.append("password", formData.password);

        const data = await PostService(
          `user/confirm-password/${token}`,
          true,
          formDataToSend
        );
        if(data) navigate('/login')
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Reset Your Password
          </h2>
          <p className="mt-2 text-center text-sm text-blue-100">
            Enter your new password below
          </p>
        </div>
     
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="relative">
                <label htmlFor="new-password" className="sr-only">
                  New Password
                </label>
                <input
                  id="new-password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  required
                  className="appearance-none rounded-t-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                  value={formData.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm New Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>

            {errors.password && (
              <div className="text-red-300 text-sm mt-2 bg-red-500 bg-opacity-20 p-2 rounded">{errors.password}</div>
            )}
            {errors.confirmPassword && (
              <div className="text-red-300 text-sm mt-2 bg-red-500 bg-opacity-20 p-2 rounded">{errors.confirmPassword}</div>
            )}
            {errors.match === false && (
              <div className="text-red-300 text-sm mt-2 bg-red-500 bg-opacity-20 p-2 rounded">Confirm Password not matched</div>
            )}

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
          <Link to={"/login"} className="font-medium text-blue-300 hover:text-white transition duration-150 ease-in-out">
            Back to Login
          </Link>
        </div>
      </div>
    </div>








  );
};

export default ConfirmPassword;
