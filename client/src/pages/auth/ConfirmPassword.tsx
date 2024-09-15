import { useState, FocusEvent, ChangeEvent, FormEvent } from "react";
import {  useNavigate, useParams } from "react-router-dom";

// input validation function
import { validatePassword } from "../../utils/validation/validation";
// Post request service
import { PostService } from "../../utils/HTTP/Post";

const ConfirmPassword = () => {
  const navigate = useNavigate()
  // Handling form data
  const [formData, setFormData] = useState<{ password: string }>({
    password: "",
  });

  // Handling Errors
  const [errors, setErrors] = useState<{ password: string }>({ password: "" });

  //Mouse click outside of input event
  const [touched, setTouched] = useState<{ password: boolean }>({
    password: false,
  });

  // Token coming from URL
  const { token } = useParams();

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });

    setErrors({ ...errors, [name]: validatePassword(formData.password) });
  };

  //Manipulating Form Data
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Manipulating Error comes under the input
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errors.password) {
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
    <div className="flex h-[100vh] justify-center items-center">
      <div className="form_group bg-[#fff] rounded-lg shadow-md overflow-hidden m-auto flex flex-col sm:flex-row flex-wrap justify-center items-center w-[368px]">
        <div className="overlay h-[480px] w-full flex flex-col justify-center text-center items-center text-[#FFFFFF] gap-2 px-2 bg-gradient-to-r from-red-500 to-pink-500">
          <form
            onSubmit={handleSubmit}
            className="flex w-full items-center justify-center gap-4 flex-col px-4 h-[50%] text-center"
          >
            <h1 className="text-2xl">Reset Password</h1>
            <div className="w-full">
              {/* Password field */}
              <input
                type="password"
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.password}
                className="bg-[#eee] text-[#000] border-0 p-3 my-1 outline-0 rounded-md w-full"
                placeholder="Password"
              />
              {errors.password && (
                <span className="text-[#ffffff] py-1 inline-block text-sm">
                  {errors.password}
                </span>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="rounded-xl font-bold inline-block border-2 border-[#FFFFFF] bg-transparent text-[#FFFFFF] py-2 px-4 text uppercase transition-transform duration-80 ease-in tracking-[1px]"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPassword;
