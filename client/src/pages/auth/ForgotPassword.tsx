import { useState, FormEvent, FocusEvent, ChangeEvent } from 'react'
// Input validation function
import { validateEmail } from '../../utils/validation/validation';
// Show alert function
import { showAlert } from '../../utils/showAlert';
// Post request service
import { PostService } from '../../utils/HTTP/Post';

const ForgotPassword = () => {
  // Handling form data
    const [formData, setFormData] = useState<{ email: string }>({ email: "" });
    
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
    const handleChange = (e:   ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };  

    // Submit form
  const handleSubmit = async (e:   FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errors.email) {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      try {
        const data = await PostService('user/forgot-password', true, formDataToSend)
      } catch (err) {
        showAlert(false,'Something went wrong')
      }
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
              <h1 className='text-2xl'>Forgot Password</h1>
              <div className='w-full'>
             {/* Email field */}
             <input
                type="text"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.email}
                className="bg-[#eee] border-0 p-3 my-1 outline-0 rounded-md w-full"
                placeholder="Email"
              />
              {errors.email && (
                <span className="text-[#ffffff] py-1 inline-block text-sm">{errors.email}</span>
              )}
 
              </div>
              {/* button */}
              <button
                type="submit"
                className="rounded-xl font-bold inline-block border-2 border-[#FFFFFF] bg-transparent text-[#FFFFFF] py-2 px-4 text uppercase transition-transform duration-80 ease-in tracking-[1px]"
              >
                Submit
              </button>
            </form>
          </div>
      </div>
    </div>
  )
}

export default ForgotPassword