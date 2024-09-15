import { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
// Input validation functions
import {
  validateEmail,
  validatePassword,
} from "../../utils/validation/validation";

// Type validation model
import { SignupModel } from "../../models/auth";
// Universal Password Component
import Password from './Password';
// Default Image
import { no_user_image } from "../../utils/logo";
// Post Request Service 
import { PostService } from "../../utils/HTTP/Post";

const Signup = () => {
  const navigate = useNavigate();

  //Handling Form Data
  const [formData, setFormData] = useState<SignupModel>({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });

  //Handling errors
  const [errors, setErrors] = useState<{email:string, password:string}>({ email: "", password: "" });
  
  //Mouse click outside of input event
  const [touched, setTouched] = useState<{email:boolean, password:boolean, username:boolean}>({
    username: false,
    email: false,
    password: false,
  });

  //Manipulating Form Data
  const handleChange = (e:   ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Manipulating Error comes under the input
  const handleBlur = (e:   FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    setErrors({
      ...errors,
      [name]:
        name === "email"
          ? validateEmail(formData.email)
          : validatePassword(formData.password),
    });
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

    if (!errors.email && !errors.email && formData.username) {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.username);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);
      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      }
      const data = await PostService("user/register", true, formDataToSend);
      navigate("/login");
    }
  };

  return (
    <div className="form_group bg-[#fff] rounded-lg shadow-md overflow-hidden m-auto flex flex-col sm:flex-row flex-wrap justify-center items-center w-[768px]">
      <div className="h-[480px] sm:min-w-[50%] max-w-[50%] min-w-[100%] form-container sign-in-container">
        <form
          className="bg-[#FFFFFF] flex justify-center items-center flex-col px-4 h-full text-center"
          onSubmit={handleSubmit}
          action="#"
        >
          <h1>Signup</h1>

          {/* Username field */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-[#eee] border-0 p-3 my-2 outline-0 rounded-md w-full"
            placeholder="Username"
          />
          {!formData.username && touched.username && (
            <span className="text-red-500 text-sm">
              Username field is required
            </span>
          )}

          {/* Email field */}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="bg-[#eee] border-0 p-3 my-2 outline-0 rounded-md w-full"
            placeholder="Email"
          />
          {errors.email && touched.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}

          {/* Password field */}
          <Password
            value={formData.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {errors.password && touched.password && (
            <span className="text-red-500 text-sm">{errors.password}</span>
          )}

          {/* Image Upload  */}
          <div className="min-w-[100%] my-2 flex items-center">
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
                className="max-w-[50px] rounded-full"
              />
            )}
            <input
              type="file"
              name="avatar"
              accept=".jpeg, .jpg, .png"
              onChange={handleFileInputChange}
              className=""
              id=""
            />
          </div>

          {/* Signup button */}
          <button
            type="submit"
            className="rounded-xl font-bold inline-block border-2 border-[#FF4B2B] bg-[#FF4B2B] text-sm text-[#FFFFFF] py-3 px-11 uppercase transition-transform duration-80 ease-in tracking-[1px]"
          >
            Signup
          </button>
        </form>
      </div>

      {/* Go back to Login */}
      <div className="overlay-container w-full sm:w-2/4 h-[480px]">
        <div className="overlay flex flex-col justify-center text-center items-center text-[#FFFFFF] h-full gap-2 px-2 bg-gradient-to-r from-red-500 to-pink-500">
          <h1>Already have an account?</h1>
          <p>To keep connected with us please login with your personal info</p>
          <Link
            to="/login"
            className="anchor text-[#FFFFFF] tracking-[1px] font-bold inline-block text-sm py-3 px-11 rounded-2xl bg-opacity-0 border-2 border-[#FFFFFF]"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
