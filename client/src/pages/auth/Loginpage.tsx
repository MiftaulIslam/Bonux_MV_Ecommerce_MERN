
import Login from '../../components/auth/Login'
import { Link } from 'react-router-dom'
const Loginpage = () => {
 
  return (
    <div className="flex h-[100vh] justify-center items-center">
        <div className="form_group bg-[#fff] rounded-lg shadow-md overflow-hidden m-auto flex flex-col sm:flex-row flex-wrap justify-center items-center w-[768px]">
          
      <div className="h-[480px] sm:min-w-[50%] max-w-[50%] min-w-[100%] form-container sign-in-container">
        <Login/>
        </div>
     
      <div className="overlay-container w-full sm:w-2/4 h-[480px]">
        <div className="overlay flex flex-col justify-center text-center items-center text-[#FFFFFF] h-full gap-2 px-2 bg-gradient-to-r from-red-500 to-pink-500">
          <h1>Don't have an account?</h1>
          <p>Start a new journey with us</p>
          <Link
            to="/signup"
            className="anchor text-[#FFFFFF] uppercase font-bold inline-block text-sm py-3 px-11 rounded-2xl bg-opacity-0 border-2 border-[#FFFFFF]"
          >
            Signup
          </Link>
        </div>
      </div>
        </div>
    </div>
  )
}

export default Loginpage