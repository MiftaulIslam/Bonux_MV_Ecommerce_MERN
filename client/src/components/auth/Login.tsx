import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../state/actions/userAction.ts";

// Input Validation functions
import {
  validateEmail,
  validatePassword,
} from "../../utils/validation/validation";
// Type validation model
import { LoginModel } from "../../models/auth";
// Post request Service
import { PostService } from "../../utils/HTTP/Post.ts";
import { useLoader } from "../../hooks/LoaderProvider.tsx";
import { loginProp } from "../../models/PropType.ts";
import { AppDispatch } from "../../state/store/store.ts";

const Login:React.FC<loginProp> = ({ role }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { showLoader, hideLoader } = useLoader();
  // Redux state management

  // Handling Form data
  const [formData, setFormData] = useState<LoginModel>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" }); // Handling Error text
  const [touched, setTouched] = useState({ email: false, password: false }); // On blur text change

  // Form Data manipulation
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Mouse click outside of input event
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    const validationError =
      name === "email"
        ? validateEmail(formData.email)
        : validatePassword(formData.password);
    setErrors({ ...errors, [name]: validationError });
  };

  // Form Submit method
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate before submit
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      setTouched({ email: true, password: true });
      return;
    }

    // Perform login logic here
    const formDataToSend = new FormData();
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);

    try {
      showLoader();
      const data = await PostService(
        role === "seller" ? "seller/seller-login" : "user/login",
        true,
        formDataToSend
      );
      localStorage.setItem('token', JSON.stringify(data.data.token))
      console.log(data.data);
      if(data.ok){
        dispatch(fetchUser());
        if(data.data.data.role =='admin'){
          navigate('/admin')
        }else if(data.data.data.role == 'seller'){
          navigate('/seller')
        }else{
          navigate('/')
        }

      }
      
      hideLoader();
      
    } catch (err: any) {
      
      hideLoader();
      console.log(err);
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
          <div>
            <h2 className="mt-4 text-center text-2xl font-extrabold text-white">
              Sign in to your {role} account
            </h2>
            <p className="mt-2 text-center text-sm text-blue-100">
              Or{" "}
              {role === "seller" ? (
                <Link
                  to="/signup?role=seller"
                  className="font-medium text-blue-300 hover:text-white"
                >
                  create a new seller account
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="font-medium text-blue-300 hover:text-white"
                >
                  create a new account
                </Link>
              )}
            </p>
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
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none  sm:text-sm"
                  placeholder="Password"
                  value={formData.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  disabled
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-blue-100"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-blue-300 hover:text-white"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>
            <div>
              {errors.email && (
                <div className="text-white text-sm mt-2 bg-red-500 bg-opacity-20 p-2 rounded">
                  {errors.email}
                </div>
              )}
              {errors.password && (
                <div className="text-white text-sm mt-2 bg-red-500 bg-opacity-20 p-2 rounded">
                  {errors.password}
                </div>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Sign in
              </button>
            </div>
            
          <div className="text-center flex items-center justify-between m-0">
            {role === "user" ? (
              <>
              <p className="text-sm text-blue-100">
                Want to be a seller?{" "}
                <Link
                  className="font-medium text-[#ddd] hover:text-white"
                  to={"/signup?role=seller"}
                >
                  Click here
                </Link>
              </p>
              
              <p className="text-sm text-blue-100">
                Activate account?{" "}
                <Link
                  className="font-medium text-[#ddd] hover:text-white"
                  to={"/request-activation"}
                >
                  Click here
                </Link>
              </p>
              </>
            ) : (
              
              <p className="text-sm text-blue-100">
                Activate account?{" "}
                <Link
                  className="font-medium text-[#ddd] hover:text-white"
                  to={"/request-activation?role=seller"}
                >
                  Click here
                </Link>
              </p>
            )}
            
          </div>
          </form>

        </div>
      </div>
    </>
  );
};

export default Login;
