
import { ChangeEvent, FocusEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../state/actions/userAction.ts";

// Input Validation functions
import {
  validateEmail,
  validatePassword,
} from "../../utils/validation/validation";
// Universal Password component
import Password from "./Password";
// Type validation model
import { LoginModel } from "../../models/auth";
// Post request Service
import { PostService } from "../../utils/HTTP/Post.ts";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Redux state management
  const { isLoggedIn, user, loading } = useSelector((state) => state.user);

  //Handling Form data
  const [formData, setFormData] = useState<LoginModel>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" }); //Handling Error text
  const [touched, setTouched] = useState({ email: false, password: false }); //On blur text change

  //Form Data manipulation
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Mouse click outside of input event
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors,[name]: name==="email"? validateEmail(formData.email):validatePassword(formData.password) });
  };
  // Form Submit method
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If email and password are valid then forward
    if (!errors.email && !errors.password) {
      // Perform login logic here
      const formDataToSend = new FormData();
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      const data = await PostService("user/login", true, formDataToSend)
//  Saving to Redux store
      if (!isLoggedIn) {
        dispatch(fetchUser());
      }
    }
  };

  useEffect(() => {
    if (!loading && isLoggedIn && user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [loading]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-[#FFFFFF] flex justify-center items-center flex-col px-4 h-full text-center"
      >
        <h1>Sign in</h1>
        {/* Email field */}
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={formData.email}
          className="bg-[#eee] border-0 p-3 my-2 outline-0 rounded-md w-full"
          placeholder="Email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}


        {/* Password field */}
        <Password
          value={formData.password}
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}

        {/* Other Buttons */}
        <p>
          <Link
            className="color-dark inline-block anchor text-[#000] text-sm py-3 px-2 rounded-2xl bg-opacity-0 border-2 border-[#FFFFFF]"
            to="/forgot-password"
          >
            Forgot your password?
          </Link>
          |
          <Link
            className="color-dark inline-block anchor text-[#000] text-sm py-3 px-2 rounded-2xl bg-opacity-0 border-2 border-[#FFFFFF]"
            to="/request-activation"
          >
            Request for activation
          </Link>
        </p>
        <button
          type="submit"
          className="rounded-xl font-bold inline-block border-2 border-[#FF4B2B] bg-[#FF4B2B] text-[#FFFFFF] py-3 px-11 text uppercase transition-transform duration-80 ease-in tracking-[1px]"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default Login;
